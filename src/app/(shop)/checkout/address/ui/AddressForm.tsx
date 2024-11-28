"use client";

import { Address, Country } from "@/interfaces";
import { useCartStore } from "@/store";
import { useAddressStore } from "@/store/address/address-store";
import { useShippingMethodStore } from "@/store/shipping/shipping-method-store";
import { placeOrder } from "@/actions";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

type FormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
  shippingMethod: "argentina" | "international" | "showroom";
  rememberAddress: boolean;
};

interface Props {
  countries: Country[];
  userStoredAddress?: Partial<Address>;
}

export const AddressForm = ({ countries, userStoredAddress = {} }: Props) => {
  const { total } = useCartStore((state) => state.getSummaryInformation());
  const cart = useCartStore((state) => state.cart);
  const setShippingMethod = useShippingMethodStore((state) => state.setShippingMethod);

  const router = useRouter();

  if (total === 0) {
    redirect("/empty");
  }

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { isValid },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      ...userStoredAddress,
      shippingMethod: "argentina",
      rememberAddress: false,
    },
  });

  const { data: session } = useSession({ required: true });
  const country = watch("country");

  useEffect(() => {
    if (country === "AR") {
      setValue("shippingMethod", "argentina");
    } else if (country) {
      setValue("shippingMethod", "international");
    }
  }, [country, setValue]);

  const setAddress = useAddressStore((state) => state.setAddress);
  const storeAddress = useAddressStore((state) => state.address);

  useEffect(() => {
    if (storeAddress.firstName) {
      reset(storeAddress);
    }
  }, []);

  const onSubmit = async (data: FormInputs) => {
    const { rememberAddress, shippingMethod, ...restAddress } = data;
  
    try {
      // Guardar la dirección en el store
      setAddress({
        ...restAddress,
        shippingMethod, // Aseguramos que este campo también se guarda
      });
  
      setShippingMethod(shippingMethod); // Establece el método de envío globalmente
  
      const productsToOrder = cart.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        color: product.color,
      }));
  
      const response = await placeOrder(productsToOrder, restAddress, shippingMethod);
  
      if (!response.ok) {
        throw new Error(response.message || "Error al crear la orden.");
      }
  
      router.push("/checkout");
    } catch (error) {
      console.error("Error en AddressForm:", error);
      alert("Hubo un error. Por favor, intenta nuevamente.");
    }
  };
  
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2"
      >
        {/* Campos de dirección */}
        {["argentina", "international"].includes(
          userStoredAddress.shippingMethod || "argentina"
        ) && (
          <>
            <div className="flex flex-col mb-2">
              <span>Nombres</span>
              <input
                type="text"
                className="p-2 border rounded-md bg-gray-200"
                {...register("firstName", { required: true })}
              />
            </div>

            <div className="flex flex-col mb-2">
              <span>Apellidos</span>
              <input
                type="text"
                className="p-2 border rounded-md bg-gray-200"
                {...register("lastName", { required: true })}
              />
            </div>

            <div className="flex flex-col mb-2">
              <span>Dirección</span>
              <input
                type="text"
                className="p-2 border rounded-md bg-gray-200"
                {...register("address", { required: true })}
              />
            </div>

            <div className="flex flex-col mb-2">
              <span>Dirección 2 (opcional)</span>
              <input
                type="text"
                className="p-2 border rounded-md bg-gray-200"
                {...register("address2")}
              />
            </div>

            <div className="flex flex-col mb-2">
              <span>Código postal</span>
              <input
                type="text"
                className="p-2 border rounded-md bg-gray-200"
                {...register("zip", { required: true })}
              />
            </div>

            <div className="flex flex-col mb-2">
              <span>Ciudad</span>
              <input
                type="text"
                className="p-2 border rounded-md bg-gray-200"
                {...register("city", { required: true })}
              />
            </div>

            <div className="flex flex-col mb-2">
              <span>País</span>
              <select
                className="p-2 border rounded-md bg-gray-200"
                {...register("country", { required: true })}
              >
                <option value="">[ Seleccione ]</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col mb-2">
              <span>Teléfono</span>
              <input
                type="text"
                className="p-2 border rounded-md bg-gray-200"
                {...register("phone", { required: true })}
              />
            </div>

            <div className="flex flex-col mb-2 sm:mt-1">
              <div className="inline-flex items-center mb-10">
                <label
                  className="relative flex cursor-pointer items-center rounded-full p-3"
                  htmlFor="checkbox"
                  data-ripple-dark="true"
                >
                  <input
                    type="checkbox"
                    className="border-gray-500 before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-500 checked:bg-blue-500 checked:before:bg-blue-500 hover:before:opacity-10"
                    id="checkbox"
                    {...register("rememberAddress")}
                    //   checked
                  />
                  <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </label>
                <span>Recordar dirección</span>
              </div>
            </div>
          </>
        )}

        <div className="flex flex-col mb-2"></div>

        <button
          disabled={!isValid}
          type="submit"
          className={clsx({
            "btn-primary flex w-full sm:w-1/2 justify-center": isValid,
            "btn-disabled cursor-not-allowed": !isValid,
          })}
        >
          Siguiente
        </button>
      </form>
    </>
  );
};
