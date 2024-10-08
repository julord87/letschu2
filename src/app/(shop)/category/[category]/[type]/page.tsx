import { getAllPaginatedProductsWithImagesByType } from "@/actions";
import { Pagination } from "@/components";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

interface Props {
  params: {
    type: string;
  };
  searchParams: {
    page?: string; 
    take?: string; // Agregar take como parámetro opcional
  };
}

export default async function TypeByPage({ params, searchParams }: Props) {
  const { type } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const take = searchParams.take ? Math.min(parseInt(searchParams.take), 100) : 1; // Limitar a 100 como máximo

  console.log("Type:", type);

  const { products, currentPage, totalPages } = await getAllPaginatedProductsWithImagesByType({ 
    page, 
    take, // Pasar el valor de take
    typeName: type,
  });

  if (products.length === 0) {
    // Considera redirigir a una página que muestre un mensaje de error o lista de tipos
    redirect(`/type/${type}`);
  }

  return (
    <>
      <Title 
        title={`Arnes - ${type}`}
        subtitle="Todos los productos"
        classname="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}