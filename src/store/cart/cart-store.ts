import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";



interface State {
    cart: CartProduct[];
    
    getTotalItems: () => number;

    addProductToCart: (product: CartProduct) => void;

    updateProductQuantity: (product: CartProduct, quantity: number) => void;

    removeProduct: (id: string, color?: string, courier?: string) => void;

    removeProductsByCategory: (category: string) => number;

    getSummaryInformation: () => {
        subtotal: number;
        total: number;
        totalItems: number;
    }

    clearCart: () => void;
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

        removeProduct: (id: string, color?: string, courier?: string) => {

            const { cart } = get();

            set({ 

                cart: cart.filter(item => 

                    item.id !== id || item.color !== color || item.courier !== courier

                ) 

            });

        },

        removeProductsByCategory: (category: string) => {
            const { cart } = get();
            const productsToRemove = cart.filter(item => item.category === category);
            const updatedCart = cart.filter(item => item.category !== category);
            const shippingCost = productsToRemove.reduce((acc, item) => acc + item.price * item.quantity, 0);
        
            set({ cart: updatedCart });
        
            return shippingCost; // Retornamos el costo total de productos de categoría "envíos"
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
        },

        clearCart: () => {
            set({ cart: [] });
        }

    }),

        {
            name: "shopping-cart",
        }
    )
)