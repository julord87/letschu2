"use client"

import Image from 'next/image';
import { useCartStore } from "@/store";
import { useEffect, useState } from 'react';
import { currencyFormat } from '@/helpers/currencyFormat';

export const ProductsInCheckout = () => {
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
            <span className='text-sm capitalize'>{`${product.quantity} ${product.title} - ${colorNameFormater(product.color)}`}</span>
            <p className="font-bold text-sm mb-0">${currencyFormat(product.price * product.quantity)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
