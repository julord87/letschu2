import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    userId?: string;
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
    shippingMethod?: "argentina" | "international" | "showroom";
  };

  //Methods
  setAddress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        zip: "",
        city: "",
        country: "",
        phone: "",
        shippingMethod: "argentina",
      },

      //Methods
      setAddress: (address) => {
        set({ address });
      },
    }),
    {
      name: "address-store",
    }
  )
);
