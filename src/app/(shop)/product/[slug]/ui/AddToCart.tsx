"use client";

import { useState } from "react";

import { ColorSelector, CourierSelector, QuantitySelector } from "@/components";
import { CartProduct, Colors, Product } from "@/interfaces";
import { useCartStore } from "@/store";

type ShippingCompanies =
  | "correo_argentino"
  | "fedex"
  | "dhl"
  | "oca"
  | "andreani"
  | "ups";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [color, setColor] = useState<Colors | undefined>();
  const [courier, setCourier] = useState<ShippingCompanies | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (product.category === "envios" && !courier) {
      return;
    }

    if (product.category !== "envios" && !color) {
      return;
    }

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity,
      image: product.images[0],
      color: product.category === "envios" ? undefined : color,
      courier: product.category === "envios" ? courier : undefined,
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setColor(undefined);
    setCourier(undefined);
  };

  return (
    <>
      {posted && product.category !== "envios" && !color && (
        <span className="mt-2 text-red-500 fade-in">Selecciona un color*</span>
      )}
      {posted && product.category === "envios" && !courier && (
        <span className="mt-2 text-red-500 fade-in">Selecciona un courier*</span>
      )}
      {/* Mostrar ColorSelector o CourierSelector según la categoría */}
      {product.category !== "envios" && (
        <ColorSelector
          availableColors={product.colors}
          selectedColor={color}
          onColorChange={setColor}
        />
      )}
      {product.category === "envios" && (
        <CourierSelector
          availableCouriers={product.shippingCompanies}
          selectedCourier={courier}
          onCourierChange={setCourier}
        />
      )}
      {/* Select quantity */}
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
      {/* Add to cart Button */}
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
