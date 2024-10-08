import { getAllPaginatedProductsWithImagesByCategory } from "@/actions";
import { Pagination } from "@/components";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
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
  const take = searchParams.take ? parseInt(searchParams.take) : 1; // Valor por defecto

  console.log("Category:", category);

  const { products, currentPage, totalPages } = await getAllPaginatedProductsWithImagesByCategory({ 
    page, 
    take, // Pasar el valor de take
    categoryName: category,
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
