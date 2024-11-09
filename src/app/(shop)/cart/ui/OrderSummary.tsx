"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store";
import { currencyFormat } from "@/helpers/currencyFormat";

export const OrderSummary = () => {

    const [loaded, setLoaded] = useState(false);
    const {subtotal, total, totalItems} = useCartStore(state => state.getSummaryInformation());

    useEffect(() => {
        setLoaded(true);
    }, [])

    if(!loaded) {
        return <p>Cargando...</p>
    }

  return (
    <>
      <span>No. Productos</span>
      <span className="text-right">{totalItems}</span>

      <span>Subtotal</span>
      <span className="text-right">${currencyFormat(subtotal)}</span>

      <span className="text-lg mt-5 font-semibold">Total</span>
      <span className="text-lg mt-5 text-right font-semibold">${currencyFormat(total)}</span>
    </>
  );
};
