'use server'
import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug,
      },
      include: {
        ProductImage: true,
        category: true, // Incluye la categoría asociada
      },
    });

    if (!product) {
      return null;
    }

    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),
      category: product.category?.name ?? "Sin categoría", // Devuelve el nombre de la categoría o "Sin categoría"
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el producto");
  }
};
