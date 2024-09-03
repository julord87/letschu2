import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";


interface Props {
  params: {
    type: string
  }
}

const products = initialData.products

export default function({ params }: Props) {

const { type } = params;
const filteredProducts = products.filter((product) => product.type === type)


return (
  <>
    <Title 
      title="Tienda"
      subtitle={`Arnes - ${type}`}
      classname="mb-2 capitalize"
    />

    <ProductGrid
      products={filteredProducts}
    />
  </>
);
}