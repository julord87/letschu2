"use client";

import { useRouter } from "next/navigation";
import { useShippingMethodStore } from "@/store/shipping/shipping-method-store";
import { useAddressStore } from "@/store/address/address-store";
import { useCartStore } from "@/store";
import { placeOrder } from "@/actions";
import clsx from "clsx";

interface Props {
    isValid: boolean;
}

export const RetiroEnShowroomButton = ({ isValid }: Props) => {
  const router = useRouter();
  const setShippingMethod = useShippingMethodStore((state) => state.setShippingMethod);
  const cart = useCartStore((state) => state.cart);
  const storeAddress = useAddressStore((state) => state.address);

  const handleClick = async () => {
    try {
      // Verificar que la dirección esté completa
      if (
        !storeAddress.firstName ||
        !storeAddress.lastName ||
        !storeAddress.address ||
        !storeAddress.city ||
        !storeAddress.country ||
        !storeAddress.zip
      ) {
        alert("Por favor, completa todos los datos de envío antes de continuar.");
        return;
      }

      // Configurar el método de envío
      setShippingMethod("showroom");

      // Preparar productos para la orden
      const productsToOrder = cart.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        color: product.color,
      }));

      // Crear la orden usando la dirección ingresada
      const response = await placeOrder(
        productsToOrder,
        storeAddress, // Usar la dirección almacenada
        "showroom"
      );

      if (!response.ok) {
        throw new Error(response.message || "Error al crear la orden.");
      }

      // Navegar al siguiente paso
      router.push("/checkout");
    } catch (error) {
      console.error("Error en RetiroEnShowroomButton:", error);
      alert("Hubo un error al procesar tu solicitud. Intenta nuevamente.");
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!isValid} // Sólo habilitado cuando el formulario es válido
      className={clsx({
        "btn-primary flex w-min sm:w-1/2 justify-center": isValid,
        "btn-disabled flex w-min sm:w-1/2 justify-center cursor-not-allowed": !isValid,
      })}
    >
      Retiro en showroom
    </button>
  );
};
