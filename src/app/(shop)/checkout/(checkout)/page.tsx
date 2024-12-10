"use client";

import Title from "@/components/ui/title/Title";
import Link from "next/link";
import { ProductsInCheckout } from "./ui/ProductsInCheckout";
import { PlaceOrder } from "./ui/PlaceOrder";
import { useCartStore } from "@/store";
import { useShippingMethodStore } from "@/store/shipping/shipping-method-store";
import { useEffect } from "react";

interface ShippingMethodState {
  shippingCost: number;
  setShippingCost?: (cost: number) => void; // Agregar si es necesario
}
export default function CheckoutPage() {

  const removeProductsByCategory = useCartStore((state) => state.removeProductsByCategory);
  const shippingCost = useShippingMethodStore((state) => state.shippingCost);
  const setShippingCost = useShippingMethodStore((state) => state.setShippingCost);
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    const hasShippingProduct = cart.some((item) => item.category === "envios");
  
    if (hasShippingProduct) {
      const shippingCost = removeProductsByCategory("envios");
      setShippingCost?.(shippingCost); // Usa el operador opcional si setShippingCost es opcional
    }
  }, [cart, removeProductsByCategory, setShippingCost]);

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        
        <Title 
          title="Verificar orden"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href="/cart" className="underline mb-5">Editar carrito</Link>

          {/* Items */}
            <ProductsInCheckout />
          </div>

          {/* Checkout - Resumen de orden*/}
          <PlaceOrder />

        </div>
        
      </div>
    </div>
  );
}