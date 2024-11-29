import CopyAddress from "@/app/(shop)/orders/[id]/ui/CopyAddress";

import { Order, OrderAddress } from "@prisma/client";
import React from "react";

interface Props {
  order: Order;
  address: OrderAddress;
  countryId: string;
}

export const ResumenOrder = ({ order, address, countryId }: Props) => {
  return (
    <>
      {order.shippingMethod !== "showroom" ? (
        <>
          <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
          <div className="mb-3">
            <p className="text-xl">
              {address!.firstName} {address!.lastName}
            </p>
            <p>{address!.address}</p>
            <p>{address!.address2}</p>
            <p>{address!.zip}</p>
            <p>
              {address!.city}, {countryId}
            </p>
            <p>{address!.phone}</p>
            <p className="mt-2">
              Método de envío:
              {order.shippingMethod === "argentina"
                ? " envío a domicilio nacional"
                : " envío internacional a domicilio"}
            </p>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl mb-2 font-bold">Retiro en showroom</h2>
          <div className="mb-8">
            <p className="text-xl mt-2">Guardá esta dire:</p>
            <CopyAddress />
            <p>Horario de atención: Lunes a Sábados de 10 a 18hs</p>
          </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gray-200 rounded mb-8"></div>

            <h2 className="text-2xl mb-2 font-bold">Datos de Facturación</h2>
          <div className="mb-3">
            <p className="text-xl">
              {address!.firstName} {address!.lastName}
            </p>
            <p>{address!.address}</p>
            <p>{address!.address2}</p>
            <p>{address!.zip}</p>
            <p>
              {address!.city}, {countryId}
            </p>
            <p>{address!.phone}</p>
          </div>
        </>
      )}
    </>
  );
};
