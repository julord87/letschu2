"use client";

import Title from "@/components/ui/title/Title";
import Link from "next/link";
import { ProductsInCheckout } from "./ui/ProductsInCheckout";
import { PlaceOrder } from "./ui/PlaceOrder";
import { useCartStore } from "@/store";
import { useShippingMethodStore } from "@/store/shipping/shipping-method-store";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const removeProductsByCategory = useCartStore((state) => state.removeProductsByCategory);
  const setShippingCost = useShippingMethodStore((state) => state.setShippingCost);
  const setShippingProductId = useShippingMethodStore((state) => state.setShippingProductId); // Nueva función
  const cart = useCartStore((state) => state.cart);

  const [processedShipping, setProcessedShipping] = useState(false);

  useEffect(() => {
    if (processedShipping) return;

    const shippingProduct = cart.find((item) => item.courier);

    if (shippingProduct) {
      const shippingCost = removeProductsByCategory("envios");
      setShippingCost?.(shippingCost);
      setShippingProductId?.(shippingProduct.id); // Guardar el ID del producto de envío
      setProcessedShipping(true); // Marcar como procesado
    }
  }, [cart, processedShipping, removeProductsByCategory, setShippingCost, setShippingProductId]);

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