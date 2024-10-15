import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";



interface State {
    cart: CartProduct[];
    
    getTotalItems: () => number;

    addProductToCart: (product: CartProduct) => void;

    updateProductQuantity: (product: CartProduct, quantity: number) => void;

    removeProduct: (id: string, color: string) => void;

    getSummaryInformation: () => {
        subtotal: number;
        total: number;
        totalItems: number;
    }
}

export const useCartStore = create<State>()(


    persist (
            
    (set, get) => ({
        cart: [],

        //Methods
        getTotalItems: () => {
            const { cart } = get();
            return cart.reduce((total, item) => total + item.quantity, 0);
        },

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

        updateProductQuantity: (product: CartProduct, quantity: number) => {
            const { cart } = get();
            set({ cart: cart.map(item => {
                if (item.id === product.id && item.color === product.color) {
                    return {
                        ...item,
                        quantity
                    }
                }
                return item
            }) })
        },

        removeProduct: (id: string, color: string) => {
            const { cart } = get();
            set({ cart: cart.filter((item) => item.id !== id || item.color !== color) })
        },

        getSummaryInformation: () => {
            const { cart } = get();
            const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
            const total = subtotal;
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

            return {
                subtotal,
                total,
                totalItems
            }
        }

    }),

        {
            name: "shopping-cart",
        }
    )
)