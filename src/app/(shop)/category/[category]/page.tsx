export const revalidate = 60; // 60 segundos

import { getAllPaginatedProductsWithImagesByCategory } from "@/actions/products/product-pagination";
import { Pagination } from "@/components";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  params: {
    category: string;
  };
  searchParams: {
    page?: string;
    take?: string; // Agregar take como parámetro opcional
  };
}

export default async function CategoryByPage({ params, searchParams }: Props) {
  const { category } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = searchParams.take ? parseInt(searchParams.take) : 9; // Valor por defecto

  const { products, currentPage, totalPages } =
    await getAllPaginatedProductsWithImagesByCategory({
      page,
      take, // Pasar el valor de take
      categoryName: category,
    });

  const whatsappNumber = "+5491138126428";
  const message = `Hola! :) Necesito ayuda con mi envío internacional de letsChu!`;
  const whatsAppLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <>
      <Title
        title={category}
        subtitle={
          category === "envios"
            ? (
                <>
                  En esta sección cargaremos los costos de envíos internacional, consultanos para cotizar el envío a tu país{" "}
                  <Link rel="noopener noreferrer" className="underline text-blue-600 hover:text-blue-800" href={whatsAppLink}>aquí</Link>.
                  <br />
                  <span className="text-sm"> Realizamos envíos a todo el mundo ;)</span>
                </>
              )
            : "Todos los productos"
        }
        classname="mb-2"
      />



      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
