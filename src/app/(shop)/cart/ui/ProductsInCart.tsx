"use client"

import Image from 'next/image';
import { useCartStore } from "@/store";
import { QuantitySelector } from '@/components';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export const ProductsInCart = () => {
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const removeProduct = useCartStore(state => state.removeProduct);
    const [loaded, setLoaded] = useState(false);
    const productsInCart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoaded(true);
    }, [])

    if(!loaded) {
        return <p>Cargando...</p>
    }

    const colorNameFormater = (color: string): string => {
      return color.replace(/_/g, ' ');
   };
  

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}`} className="flex mb-5">
          <Image
            src={product.image}
            alt={product.title}
            width={130}
            height={130}
            style={{
              width: "100px",
              height: "100px",
            }}
            className="mr-5 rounded object-cover"
          />

          <div>
            <Link href={`/product/${product.slug}`} className="text-sm hover:text-blue-700 transition-all capitalize">{`${product.title} - ${colorNameFormater(product.color)}`}</Link>
            <p className="text-sm mb-0">${product.price}</p>
            <div className="text-sm mb-0 mt-0">
              <QuantitySelector quantity={product.quantity} onQuantityChange={ (value) => updateProductQuantity(product, value) } />
            </div>

            <button className="underline text-sm" onClick={() => removeProduct(product.id, product.color)}>Eliminar</button>
          </div>
        </div>
      ))}
    </>
  );
};
