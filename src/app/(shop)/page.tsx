import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination } from "@/components";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: number;
  }
}

export default async function Home({ searchParams }: Props) {

  const page = searchParams.page ? Number(searchParams.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({page});

  console.log(currentPage, totalPages);

  if (products.length === 0) {
    redirect('/')
  }

  return (
    <>
      <Title 
        title="Tienda"
        subtitle="Todos los productos"
        classname="mb-2"
      />

      <ProductGrid
        products={products}
      />

      <Pagination totalPages={totalPages}/>
    </>
  );
}
