import { create } from "zustand";

interface ShippingMethodState {
  shippingMethod: "argentina" | "international" | "showroom";
  shippingCost: number;
  shippingProductId?: string; // Nuevo campo opcional
  setShippingCost: (cost: number) => void;
  setShippingMethod: (method: "argentina" | "international" | "showroom") => void;
  setShippingProductId: (id: string) => void; // Nueva función
}

export const useShippingMethodStore = create<ShippingMethodState>((set) => ({
  shippingMethod: "argentina",
  shippingCost: 0,
  shippingProductId: "", // Inicializar
  setShippingMethod: (method) => set({ shippingMethod: method }),
  setShippingCost: (cost) => set({ shippingCost: cost }),
  setShippingProductId: (id) => set({ shippingProductId: id }),
}));

