"use client";

import { sleep } from "@/helpers";
import { currencyFormat } from "@/helpers/currencyFormat";
import { useCartStore } from "@/store";
import { useAddressStore } from "@/store/address/address-store";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {

    const [loaded, setLoaded] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const address = useAddressStore((state) => state.address);

    const {subtotal, total, totalItems} = useCartStore(state => state.getSummaryInformation());
    
    const cart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoaded(true);
    }, []);

    const onPlaceOrder = async () => {
        setIsPlacingOrder(true);

        // await sleep(2000);

        const orderProducts = cart.map((product) => {
            return {
                productId: product.id,
                quantity: product.quantity,
                color: product.color,
            }
        });

        console.log(address, orderProducts);

        setIsPlacingOrder(false);
    }

    if( !loaded ) {
        return <p>Cargando...</p>
    }
    


  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl mb-1">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.zip}</p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 rounded mb-10"></div>

      <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>

      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{totalItems}</span>

        <span>Subtotal</span>
        <span className="text-right">${currencyFormat(subtotal)}</span>

        <span className="text-xl mt-5 font-semibold">Total</span>
        <span className="text-xl mt-5 text-right font-semibold">
          ${currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer clic en &quot;Realizar pago&quot, aceptas los{" "}
            <a href="/terms-and-conditions" className="underline">
              términos y condiciones
            </a>
          </span>
        </p>

        {/* <p className="text-red-500 text-sm mb-2">Error al crear orden</p> */}

        <button
          // href="/orders/123"
          onClick={ onPlaceOrder }
          className={
            clsx({
                'btn-primary' : !isPlacingOrder,
                'btn-disabled' : isPlacingOrder
            })
          }
        >
          Realizar pago
        </button>
      </div>
    </div>
  );
};
