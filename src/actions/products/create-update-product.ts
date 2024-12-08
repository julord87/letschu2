"use server";

import prisma from "@/lib/prisma";
import { Color, Product, ShippingCompany } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL || "");

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(5).max(255),
  description: z.string().min(5).max(1000),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  colors: z.coerce.string().transform((val) => (val ? val.split(",") : [])), // Si el valor está vacío, retorna un array vacío
  tags: z.string(),
  categoryId: z.string().uuid(),
  typeId: z.string().uuid(),
  shippingCompanies: z.coerce
    .string()
    .transform((val) => (val ? val.split(",") : [])), // Lo mismo para shippingCompanies
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.error("Error en validación de datos:", productParsed.error);
    return {
      ok: false,
      message: "Datos inválidos, revise el formulario.",
    };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        // Actualizar producto
        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            colors: {
              set: rest.colors as Color[],
            },
            tags: {
              set: tagsArray,
            },
            shippingCompanies: {
              set: rest.shippingCompanies as ShippingCompany[], // Actualización de empresas de envío
            },
          },
        });
      } else {
        // Crear producto
        product = await prisma.product.create({
          data: {
            ...rest,
            colors: {
              set: rest.colors as Color[],
            },
            tags: {
              set: tagsArray,
            },
            shippingCompanies: {
              set: rest.shippingCompanies as ShippingCompany[], // Creación de empresas de envío
            },
          },
        });
      }

      // Procesar imágenes
      if (formData.getAll("images")) {
        const images = await uploadImages(formData.getAll("images") as File[]);
        if (!images) throw new Error("Error al cargar las imágenes");

        await prisma.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        });
      }

      return { product };
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return { ok: true, product: prismaTx.product };
  } catch (error) {
    console.error("Error en transacción de Prisma:", error);
    return {
      ok: false,
      message: "Error al guardar el producto.",
      details: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`)
          .then((r) => r.secure_url);
      } catch (error) {
        console.error("Error al subir imagen:", error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    if (uploadedImages.includes(null)) {
      throw new Error("Una o más imágenes no pudieron subirse.");
    }
    return uploadedImages;
  } catch (error) {
    console.error("Error en carga de imágenes:", error);
    return null;
  }
};
