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
          title="Verificar orden"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href="/cart" className="underline mb-5">Editar compra</Link>

        

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
                  <p className="text-sm mb-0">${product.price} x 3</p>
                  <p className="text-sm mt-1 font-semibold mb-2">Subtotal: ${product.price * 3}</p>


                  <button className="underline text-sm">Eliminar</button>
                </div>
              </div>  
            ))
          }
          </div>





          {/* Checkout - Resumen de orden*/}
          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl mb-1">Fernando Herrera</p>
              <p>Av. Siempre Viva 123</p>
              <p>Col. Centro</p>
              <p>Alcaldía Cuautemoc</p>
              <p>Ciudad de México</p>
              <p>CP 11400</p>
              <p>+54 1131234567</p>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gray-200 rounded mb-10">

            </div>

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

              <p className="mb-5">
                {/* Disclaimer */}
                <span className="text-xs">
                  Al hacer clic en “Realizar pago”, aceptas los <Link href="/terms-and-conditions" className="underline">términos y condiciones</Link>
                </span>
              </p>

              <Link href="/orders/123" className="flex btn-primary justify-center">Realizar pago</Link>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  );
}