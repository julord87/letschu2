"use client";

import { add } from "@/actions/payments/mercadopago";
import { useState } from "react";

interface Props {
  orderId: string;
  amount: number;
}

export const MercadoPagoButton = ({ orderId, amount }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleMercadoPagoPayment = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("orderId", orderId);
    formData.append("amount", amount.toString());

    try {
      await add(formData);
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="rounded bg-blue-500 text-white py-2 px-4 w-full mt-4"
      onClick={handleMercadoPagoPayment}
      disabled={loading}
    >
      {loading ? "Cargando..." : "Pagar con Mercado Pago"}
    </button>
  );
};

export default MercadoPagoButton;
