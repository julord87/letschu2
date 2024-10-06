import { getAllPaginatedProductsWithImagesByCategory } from "@/actions";
import { Pagination } from "@/components";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { Category } from "@prisma/client";
import { redirect } from "next/navigation";

interface Props {
  params: {
    category: string; // Cambiar a string si solo estás pasando el nombre de la categoría
  };
  searchParams: {
    page?: string; 
  };
}


export default async function CategoryByPage({ params, searchParams }: Props) {
  const { category } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  console.log("Category object:", category);


  // Asegúrate de pasar el nombre de la categoría correctamente
  const { products, currentPage, totalPages } = await getAllPaginatedProductsWithImagesByCategory({ 
    page, 
    categoryName: category, // Aquí estás pasando correctamente el nombre de la categoría
  });

  if (products.length === 0) {
    redirect(`/category/${category}`);
  }

  return (
    <>
      <Title 
        title={category}
        subtitle="Todos los productos"
        classname="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
