"use client";

import { currencyFormat } from "@/helpers/currencyFormat";
import { useCartStore } from "@/store";
import { useAddressStore } from "@/store/address/address-store";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {

    const [loaded, setLoaded] = useState(false);
    const [isPlacingOrder, setisPlacingOrder] = useState(false);

    const address = useAddressStore((state) => state.address);

    const {subtotal, total, totalItems} = useCartStore(state => state.getSummaryInformation());
    
    useEffect(() => {
        setLoaded(true);
    }, []);

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

        <button
          // href="/orders/123"
          className="flex btn-primary justify-center"
        >
          Realizar pago
        </button>
      </div>
    </div>
  );
};
