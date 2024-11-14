"use client";

import { Category, Product } from "@/interfaces";
import { Type } from "@prisma/client";
import { useForm } from "react-hook-form";

interface Props {
  product: Product;
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

  // Todo: Images
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

export const ProductForm = ({ product, categories, types }: Props) => {

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      tags: product.tags.join(", "),
      colors: product.colors ?? [],

      // Todo: images
    }
  });

  const onSubmit = async( data: FormInputs ) => {
    console.log({data})
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('title', { required: true })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('slug', { required: true })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input type="number" className="p-2 border rounded-md bg-gray-200" {...register('price', { required: true, min: 0 })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('tags', { required: true })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select className="p-2 border rounded-md bg-gray-200 capitalize" {...register('categoryId', { required: true })}>
            <option value="" >[Seleccione]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id} className="capitalize">
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Tipo</span>
          <select className="p-2 border rounded-md bg-gray-200 capitalize" {...register('typeId', { required: true })}>
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
          <span>Colores</span>
          <div className="flex flex-wrap mb-2">
            {colors.map((color) => (
              <div
                key={color}
                className="flex items-center justify-center px-2 py-1 mr-2 border rounded-md m-1 capitalize"
              >
                <span>{color}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg"
            />
          </div>
        </div>
      </div>
      
      <button className="btn-primary w-full">Guardar</button>
      
    </form>
  );
};
