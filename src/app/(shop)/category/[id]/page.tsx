import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";


interface Props {
  params: {
    id: Category
  }
}

const products = initialData.products

export default function({ params }: Props) {

const { id } = params;
const filteredProducts = products.filter((product) => product.category === id)

// if( id === 'extras') {
//   notFound();
// }

return (
  <>
    <Title 
      title={`${id}`}
      subtitle={`Todos los productos`}
      classname="mb-2"
    />

    <ProductGrid
      products={filteredProducts}
    />
  </>
);
}