import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";


interface Props {
  params: {
    id: string
  }
}

const products = initialData.products

export default function({ params }: Props) {

const { id } = params;
const filteredProducts = products.filter((product) => product.category === id)

if( id === 'extras') {
  notFound();
}

return (
  <>
    <Title 
      title="Tienda"
      subtitle={`${id}`}
      classname="mb-2 capitalize"
    />

    <ProductGrid
      products={filteredProducts}
    />
  </>
);
}