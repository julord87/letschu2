"use client";

import { useRouter } from "next/navigation";
import { useShippingMethodStore } from "@/store/shipping/shipping-method-store";
import { useCartStore } from "@/store";
import { placeOrder } from "@/actions";

export const RetiroEnShowroomButton = () => {
  const router = useRouter();
  const setShippingMethod = useShippingMethodStore(
    (state) => state.setShippingMethod
  );
  const cart = useCartStore((state) => state.cart);

  const handleClick = async () => {
    try {
      // Configurar el método de envío
      setShippingMethod("showroom");

      // Preparar productos para la orden
      const productsToOrder = cart.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        color: product.color,
      }));

      // Crear la orden
      const response = await placeOrder(
        productsToOrder,
        {
          address: "Retiro en showroom",
          address2: undefined, // Opcional
          city: "Caballito",
          country: "AR", // ID válido
          firstName: "Retiro en",
          lastName: "Showroom",
          phone: "N/A",
          zip: "N/A",
        },
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
    <button onClick={handleClick} className="btn-primary mb-7 mt-3 max-w-sm">
      Retirar en showroom
    </button>
  );
};
