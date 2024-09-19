import { getPaginatedProductsWithImages } from "@/actions";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";



export default async function Home() {

  const { products } = await getPaginatedProductsWithImages();

  console.log(products)

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
    </>
  );
}
