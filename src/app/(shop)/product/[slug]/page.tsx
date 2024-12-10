export const revalidate = 604800; // 7 días

import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { ProductMobileSlideshow, ProductSlideshow } from "@/components";
import { getProductBySlug } from "@/actions";
import { Metadata, ResolvingMetadata } from "next";
import { AddToCart } from "./ui/AddToCart";


interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
  // console.log(product?.title)
  // console.log(product?.description)
  // console.log([ `/${ product?.images[1] }`])
  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      // images: [], // https://misitioweb.com/products/image.png
      images: [`/${ product?.images[1] }`],
    },
  };
}

export default async function ProductsBySlugPage({ params }: Props) {

const { slug } = params;

const product = await getProductBySlug(slug);

if( !product ) {
  notFound();
}

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-9 px-6">
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

        <AddToCart product={product} />

        {/* Description */}
        <h3 className="font-bold text-sm mb-1">Descripción</h3>
        <p>{ product.description }</p>
      </div>
    </div>
  );
}