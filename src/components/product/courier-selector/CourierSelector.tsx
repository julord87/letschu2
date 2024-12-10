"use client";

import { getCourierImage } from "@/helpers";
import { useState } from "react";

type ShippingCompanies =
  | "correo_argentino"
  | "fedex"
  | "dhl"
  | "oca"
  | "andreani"
  | "ups";

interface Props {
  selectedCourier?: ShippingCompanies;
  availableCouriers: ShippingCompanies[];
  onCourierChange: (courier: ShippingCompanies) => void;
}

const courierNames: Record<ShippingCompanies, string> = {
  correo_argentino: "Correo Argentino",
  fedex: "FedEx",
  dhl: "DHL",
  oca: "OCA",
  andreani: "Andreani",
  ups: "UPS",
};

export const CourierSelector = ({
  selectedCourier,
  availableCouriers,
  onCourierChange,
}: Props) => {
  const [hoveredCourier, setHoveredCourier] = useState<ShippingCompanies | null>(null);

  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Couriers disponibles</h3>

      <div>
        {availableCouriers.map((courier) => (
          <div
            key={courier}
            onClick={() => onCourierChange(courier)}
            onMouseEnter={() => setHoveredCourier(courier)}
            onMouseLeave={() => setHoveredCourier(null)}
            className={`inline-block p-0.5 rounded-full cursor-pointer ${
              courier === selectedCourier ? "ring-1 ring-blue-600" : ""
            }`}
          >
            <div
              className={`${getCourierImage(
                courier
              )} w-8 h-8 rounded-full border-2 border-gray-200`}
            />
            {hoveredCourier === courier && (
              <div className="absolute mt-2 p-2 bg-black text-white text-xs rounded shadow-lg">
                {courierNames[courier]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};