import { QuantitySelector } from "@/components";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]

export default function() {


  // redirect("/empty")

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

        

          {/* Items */}
          {
            productsInCart.map(product => (
              <div key={product.slug} className="flex mb-5">
                <Image 
                  src={product.images[0]}
                  alt={product.title}
                  width={130}
                  height={130}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  className="mr-5 rounded object-cover"
                />

                <div>
                  <p className="text-sm">{product.title}</p>
                  <p className="text-sm mb-0">${product.price}</p>
                  <div className="text-sm mb-0 mt-0">
                    <QuantitySelector quantity={3} />
                  </div>

                  <button className="underline text-sm">Eliminar</button>
                </div>
              </div>  
            ))
          }
          </div>





          {/* Checkout - Resumen de orden*/}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$10000</span>

              <span className="text-2xl mt-5 font-semibold">Total</span>
              <span className="text-2xl mt-5 text-right font-semibold">$10000</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link href="/checkout/address" className="flex btn-primary justify-center">Continuar</Link>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
}