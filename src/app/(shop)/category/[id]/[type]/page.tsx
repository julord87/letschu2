import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { ValidTypes } from "@/interfaces";
import { initialData } from "@/seed/seed";


interface Props {
  params: {
    type: ValidTypes
  }
}

const products = initialData.products

export default function({ params }: Props) {

const { type } = params;
const filteredProducts = products.filter((product) => product.type === type)


return (
  <>
    <Title 
      title={`Arnes - ${type}`}
      subtitle={`Todos los productos`}
      classname="mb-2 capitalize"
    />

    <ProductGrid
      products={filteredProducts}
    />
  </>
);
}