"use client";

import { useCartStore } from "@/store";

interface ClearCartProps {
  ok: boolean;
}

export const ClearCart = ({ ok }: ClearCartProps) => {
  const clearCart = useCartStore((state) => state.clearCart);

  if (ok) {
    clearCart();
  }

  return <></>;
};
