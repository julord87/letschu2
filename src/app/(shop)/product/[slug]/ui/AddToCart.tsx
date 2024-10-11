"use client"

import { useState } from "react";

import { ColorSelector, QuantitySelector } from "@/components";
import { Colors, Product } from "@/interfaces";

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {

    const [color, setColor] = useState<Colors|undefined>();
    const [quantity, setQuantity] = useState<number>(1);



  return (
    <>
      {/* Select color */}
      <ColorSelector availableColors={product.colors} selectedColor={color} onColorChange={setColor} />

      {/* Select quantity */}
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      {/* Add to cart Button */}
      <button className="btn-primary my-5">Agregar al carrito</button>
    </>
  );
};
