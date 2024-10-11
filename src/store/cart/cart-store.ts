import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";



interface State {
    cart: CartProduct[];

    addProductToCart: (product: CartProduct) => void;

    // updateProductQuantity

    // removeProduct
}

export const useCartStore = create<State>()(


    persist (
            
    (set, get) => ({
        cart: [],

        addProductToCart: (product: CartProduct) => {
            const { cart } = get();

            // 1. Revisar si el producto existe en el carrito con el color seleccionado
            const productInCart = cart.some((item) => item.id === product.id && item.color === product.color);

            if (!productInCart) {
                set({ cart: [...cart, product] });
                return;
            }

            // 2. Se que el producto existe por color, tengo que actualizar la cantidad
            const updatedCartProducts = cart.map((item) => {
                if (item.id === product.id && item.color === product.color) {
                    return {
                        ...item,
                        quantity: item.quantity + product.quantity,
                    };
                }

                return item;
            })

            set({ cart: updatedCartProducts });

        },
    }),

        {
            name: "shopping-cart",
        }
    )
)