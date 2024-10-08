export const revalidate = 604800; // 7 días

import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { ColorSelector, ProductMobileSlideshow, ProductSlideshow, QuantitySelector } from "@/components";
import { getProductBySlug } from "@/actions";


interface Props {
  params: {
    slug: string
  }
}

export default async function ProductsBySlugPage({ params }: Props) {

const { slug } = params;

const product = await getProductBySlug(slug);
console.log(product)

if( !product ) {
  notFound();
}

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      {/* Slideshow */} 
      <div className="col-span-1 md:col-span-2">

        {/* Mobile Slideshow */}
        <ProductMobileSlideshow title={product.title} images={product.images} className="block md:hidden"/>

        {/*Desktop Slideshow */}
        <ProductSlideshow title={product.title} images={product.images} className="hidden md:block" />
      </div>



      {/* Product details */}
      <div className="col-span-1 px-5">
        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          { product.title }
        </h1>
        <p className="text-lg mb-5">${ product.price }</p>

        {/* Select color */}
        <ColorSelector availableColors={product.colors} selectedColor="rojo"/>

        {/* Select quantity */}
        <QuantitySelector quantity={2}/>

        {/* Add to cart */}
        <button className="btn-primary my-5">
          Agregar al carrito
        </button>

        {/* Description */}
        <h3 className="font-bold text-sm mb-1">Descripción</h3>
        <p>{ product.description }</p>
      </div>
    </div>
  );
}