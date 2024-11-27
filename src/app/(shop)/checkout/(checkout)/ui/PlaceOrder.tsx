"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/helpers/currencyFormat";

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("Standard");
  const [shippingCost, setShippingCost] = useState(500); // Ejemplo: costo fijo o dinámico

  const address = useAddressStore((state) => state.address);

  const { totalItems, subtotal, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    // await sleep(2);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      color: product.color,
    }));

    //! Server Action
    const resp = await placeOrder(
      productsToOrder,
      address,
      shippingMethod,
      shippingCost: number
    );
    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message || "An unexpected error occurred");
      return;
    }

    //* Todo salio bien!
    clearCart();
    setTimeout(() => {
      router.replace("/orders/" + resp.order?.id);
    }, 0);
  };

  if (!loaded) {
    return <p>Cargando...</p>;
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

        <span>Envio</span>
        <p>Costo de envío: ${currencyFormat(shippingCost)}</p>

        <span className="text-lg mt-5 font-semibold">Total</span>
        <span className="text-lg mt-5 text-right font-semibold">
          ${currencyFormat(subtotal + shippingCost)}
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

        <p className="text-red-500 text-sm mb-2">{errorMessage}</p>

        <button
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          disabled={isPlacingOrder}
        >
          {isPlacingOrder ? "Procesando..." : "Realizar pago"}
        </button>
      </div>
    </div>
  );
};
