import { create } from "zustand";

interface ShippingMethodState {
  shippingMethod: "argentina" | "international" | "showroom";
  shippingCost: number;
  setShippingMethod: (method: "argentina" | "international" | "showroom") => void;
}

export const useShippingMethodStore = create<ShippingMethodState>((set) => ({
  shippingMethod: "argentina", // Valor por defecto
  shippingCost: 500, // Costo inicial basado en el método por defecto
  setShippingMethod: (method) =>
    set({
      shippingMethod: method,
      shippingCost:
        method === "argentina"
          ? 500
          : method === "international"
          ? 1500
          : 0, // Costo según el método
    }),
}));
