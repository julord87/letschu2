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
    <>
      <button
        className="rounded bg-blue-500 text-white py-3 px-4 w-full mt-8 mb-4 hover:bg-blue-600 flex items-center justify-center gap-2"
        onClick={handleMercadoPagoPayment}
        disabled={loading}
      >
        {loading ? (
          "Cargando..."
        ) : (
          <>
            <span>Pagar con Mercado Pago</span>
            <img
              src="/imgs/mercadopago-logo.png"
              alt="MercadoPago"
              className="h-6"
            />
          </>
        )}
      </button>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 rounded mb-4"></div>
    </>
  );
};

export default MercadoPagoButton;
