import { QuantitySelector } from "@/components";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export default function() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        
        <Title 
          title="Carrito"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más productos</span>
            <Link href="/" className="underline mb-5">Continúa comprando</Link>

          </div>

          {/* Items */}
          {
            productsInCart.map(product => (
              <div key={product.slug} className="flex">
                <Image 
                  src={product.images[0]}
                  alt={product.title}
                  width={130}
                  height={130}
                  className="mr-5 rounded object-cover"
                />

                <div>
                  <p>{product.title}</p>
                  <p>${product.price}</p>
                  <QuantitySelector quantity={3} />

                  <button className="underline mt-2">Eliminar</button>
                </div>
              </div>  
            ))
          }





          {/* Checkout */}

        </div>
        
      </div>
    </div>
  );
}