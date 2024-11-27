"use client";

import { useRouter } from "next/navigation";
import { useShippingMethodStore } from "@/store/shipping/shipping-method-store";

export const RetiroEnShowroomButton = () => {
  const router = useRouter();
  const setShippingMethod = useShippingMethodStore((state) => state.setShippingMethod);

  const handleClick = () => {
    setShippingMethod("showroom"); // Método de envío: retiro en showroom
    router.push("/checkout/payment"); // Siguiente paso en el checkout
  };

  return (
    <button onClick={handleClick} className="btn-primary mb-7 mt-3 max-w-sm">
      Retirar en showroom
    </button>
  );
};
