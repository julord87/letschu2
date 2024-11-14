"use client";

import { Category, Product } from "@/interfaces";

interface Props {
  product: Product;
  categories: Category[];
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

export const ProductForm = ({ product, categories }: Props) => {
  return (
    <form className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input type="number" className="p-2 border rounded-md bg-gray-200" />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" />
        </div>

        <div className="flex flex-col mb-2">
          <span>Categoria</span>
          <select className="p-2 border rounded-md bg-gray-200">
            <option value="">[Seleccione]</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id} className="capitalize">
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Tipo</span>
          <select className="p-2 border rounded-md bg-gray-200">
            <option value="">[Seleccione]</option>
          </select>
        </div>

        <button className="btn-primary w-full">Guardar</button>
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
                className="flex items-center justify-center px-2 py-1 mr-2 border rounded-md m-1"
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
    </form>
  );
};
