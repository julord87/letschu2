"use client";

import { useState } from "react";

import { ColorSelector, QuantitySelector } from "@/components";
import { CartProduct, Colors, Product } from "@/interfaces";
import { useCartStore } from "@/store";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [color, setColor] = useState<Colors | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (!color || !quantity) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      color,
      quantity,
      image: product.images[0],
    }

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setColor(undefined);
  };

  return (
    <>
      {" "}
      {posted && !color && (
        <span className="mt-2 text-red-500 fade-in">Selecciona un color*</span>
      )}
      {/* Select color */}
      <ColorSelector
        availableColors={product.colors}
        selectedColor={color}
        onColorChange={setColor}
      />
      {/* Select quantity */}
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
      {/* Add to cart Button */}
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
