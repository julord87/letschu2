"use client";

import {
  Category,
  Product,
  ProductImage as ProductWithImage,
  Type,
} from "@/interfaces";
import { useForm } from "react-hook-form";
import Image from "next/image";
import clsx from "clsx";
import { createUpdateProduct, deleteProductImage } from "@/actions";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductImage } from "@/components";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] };
  categories: Category[];
  types: Type[];
}

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  colors: string[];
  tags: string;
  type: number;
  categoryId: string;
  typeId: string;
  shippingCompanies: string[];

  // Todo: Images
  images?: FileList;
}

const colors = [
  "negro",
  "blanco",
  "rojo",
  "azul",
  "verde",
  "rosa",
  "amarillo",
  "gris",
  "naranja",
  "violeta",
  "bordo",
  "fucsia",
  "beige",
  "celeste",
  "arcoiris",
  "animal_print",
  "amarillo_fluo",
  "naranja_fluo",
];

const shippingCompanies = [
  "correo_argentino",
  "fedex",
  "dhl",
  "oca",
  "andreani",
  "ups",
];

export const ProductForm = ({ product, categories, types }: Props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags?.join(", "),
      colors: product.colors ?? [],
      shippingCompanies: product.shippingCompanies ?? [], // Verificar que siempre sea un array
      images: undefined,
    },
  });

  watch("colors");
  const title = watch("title"); // Observar cambios en el título

  // Generar slug automáticamente basado en el título
  React.useEffect(() => {
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Elimina caracteres especiales
        .replace(/\s+/g, "-") // Reemplaza espacios por guiones
        .replace(/-+/g, "-"); // Evita múltiples guiones consecutivos
      setValue("slug", slug); // Actualiza el campo de slug
    }
  }, [title, setValue]);

  // Observar el cambio en la categoría seleccionada
  const selectedCategoryId = watch("categoryId");

  // Encontrar el nombre de la categoría seleccionada
  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  )?.name;

  // Determinar si el selector de tipo debe estar habilitado
  const isTypeSelectable = selectedCategory?.toLowerCase() === "arnes";

  // Determinar si la categoría seleccionada es de envío
  const isShippingCategory = selectedCategory?.toLowerCase() === "envios";

  // Actualizar dinámicamente el tipo si no es seleccionable
  React.useEffect(() => {
    if (!isTypeSelectable && selectedCategory) {
      // Buscar el tipo cuyo nombre coincide con la categoría
      const matchingTypeId = types.find(
        (type) => type.name.toLowerCase() === selectedCategory.toLowerCase()
      )?.id;
      if (matchingTypeId) {
        setValue("typeId", matchingTypeId); // Asignar automáticamente el tipo
      }
    }
  }, [selectedCategoryId, isTypeSelectable, selectedCategory, setValue, types]);

  const onColorChanged = (color: string) => {
    const colors = new Set(getValues("colors"));

    colors.has(color) ? colors.delete(color) : colors.add(color);

    setValue("colors", Array.from(colors));
  };

  const onCourierChanged = (courier: string) => {
    const couriers = new Set(getValues("shippingCompanies")); // Usa "shippingCompanies" directamente

    if (couriers.has(courier)) {
      couriers.delete(courier);
    } else {
      couriers.add(courier);
    }

    const updatedCouriers = Array.from(couriers);
    console.log("Updated couriers:", updatedCouriers); // Debug: Verifica que se está actualizando correctamente
    setValue("shippingCompanies", updatedCouriers); // Actualiza "shippingCompanies"
  };

  const shippingCompaniesSelected = watch("shippingCompanies");

  console.log("Shipping companies selected:", shippingCompaniesSelected); // Debug

  const onSubmit = async (data: FormInputs) => {
    setIsSubmitting(true);
    setFeedbackMessage(null);

    const formData = new FormData();

    const { images, ...productToSave } = data;
    if (product.id) formData.append("id", product.id ?? "");
    formData.append("title", productToSave.title);
    formData.append("slug", productToSave.slug);
    formData.append("description", productToSave.description);
    formData.append("price", productToSave.price.toString());
    formData.append("tags", productToSave.tags);
    formData.append("categoryId", productToSave.categoryId);
    formData.append("typeId", productToSave.typeId);
    formData.append("colors", productToSave.colors.length ? productToSave.colors.toString() : ""); 
    formData.append("shippingCompanies", productToSave.shippingCompanies.length ? productToSave.shippingCompanies.toString() : "");

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const response = await createUpdateProduct(formData);
    const ok = response?.ok ?? false;
    setIsSubmitting(false);

    if (!ok) {
      setFeedbackMessage("Error al guardar el producto. Intente nuevamente.");
      return;
    }

    setFeedbackMessage("Producto guardado con éxito");
    setTimeout(() => router.push(`/product/${productToSave.slug}`), 2000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3"
    >
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("title", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            disabled // Hace que el campo no sea editable
            {...register("slug", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            maxLength={1000}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="number"
            className="p-2 border rounded-md bg-gray-200"
            {...register("price", { required: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register("tags", { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select
            className="p-2 border rounded-md bg-gray-200 capitalize"
            {...register("categoryId", { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
                className="capitalize"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Tipo</span>
          <select
            className="p-2 border rounded-md bg-gray-200 capitalize"
            disabled={!isTypeSelectable}
            {...register("typeId", { required: true })}
          >
            <option value="">[Seleccione]</option>
            {types.map((type) => (
              <option key={type.id} value={type.id} className="capitalize">
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selector de colores y fotos */}
      <div className="w-full">
        {/* As checkboxes */}
        <div className="flex flex-col">
          {!isShippingCategory ? (
            <>
              <span>Colores</span>
              <div className="flex flex-wrap mb-2">
                {colors.map((color) => (
                  <div
                    key={color}
                    onClick={() => {
                      onColorChanged(color);
                    }}
                    className={clsx(
                      "flex items-center justify-center px-2 py-1 mr-2 cursor-pointer border rounded-md m-1 transition-all capitalize",
                      {
                        "bg-blue-500 text-white":
                          getValues("colors").includes(color),
                        "bg-gray-200": !getValues("colors").includes(color),
                      }
                    )}
                  >
                    <span>{color.replace("_", " ")}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <span>Courier</span>
              <div className="flex flex-wrap mb-2">
                {shippingCompanies.map((courier) => (
                  <div
                    key={courier}
                    onClick={() => onCourierChanged(courier)}
                    className={clsx(
                      "flex items-center justify-center px-2 py-1 mr-2 cursor-pointer border rounded-md m-1 transition-all capitalize",
                      {
                        "bg-blue-500 text-white":
                          shippingCompaniesSelected?.includes(courier), // Usa la variable que observa el estado
                        "bg-gray-200":
                          !shippingCompaniesSelected?.includes(courier),
                      }
                    )}
                  >
                    <span>{courier.replace("_", " ")}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="flex flex-col mb-2">
            <span>Imagenes</span>
            <input
              type="file"
              {...register("images")}
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/webp, image/avif"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product.ProductImage?.map((image) => (
              <div key={image.id}>
                <ProductImage
                  alt={product.title ?? ""}
                  src={`${image.url}`}
                  width={300}
                  height={300}
                  className="rounded-top shadow-md"
                />

                <button
                  type="button"
                  className="btn-danger rounded-b-xl md:w-full"
                  onClick={() => deleteProductImage(image.id, image.url)}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className={clsx("btn-primary w-full", {
          "opacity-50 cursor-not-allowed": isSubmitting,
        })}
        disabled={isSubmitting || feedbackMessage?.includes("éxito")}
        style={{ display: feedbackMessage ? "none" : "block" }} // Oculta el botón si hay feedback
      >
        {isSubmitting ? "Guardando..." : "Guardar"}
      </button>

      {feedbackMessage && (
        <div
          className={clsx("w-full p-2 text-center rounded-md", {
            "bg-green-600 text-white": feedbackMessage.includes("éxito"),
            "bg-red-600 text-white": feedbackMessage.includes("Error"),
          })}
        >
          {feedbackMessage}
        </div>
      )}
    </form>
  );
};
