"use client";

import { getTailwindBgClass } from "@/helpers/color-translate";
import { Colors } from "@/interfaces";
import { useState } from "react";

interface Props {
  selectedColor?: Colors;
  availableColors: Colors[];
  onColorChange: (color: Colors) => void;
}

const colorNames: Record<Colors, string> = {
  negro: "Negro",
  blanco: "Blanco",
  rojo: "Rojo",
  azul: "Azul",
  verde: "Verde",
  rosa: "Rosa",
  amarillo: "Amarillo",
  gris: "Gris",
  naranja: "Naranja",
  violeta: "Violeta",
  bordo: "Bordo",
  fucsia: "Fucsia",
  beige: "Beige",
  celeste: "Celeste",
  arcoiris: "Arcoiris",
  animal_print: "Animal Print",
  amarillo_fluo: "Amarillo Fluo",
  naranja_fluo: "Naranja Fluo",
};

export const ColorSelector = ({
  selectedColor,
  availableColors,
  onColorChange,
}: Props) => {
  const [hoveredColor, setHoveredColor] = useState<Colors | null>(null);

  return (
    <>
      <div className="my-5">
        <h3 className="font-bold mb-4">Colores disponibles</h3>
      </div>

      <div className="relative">
        {availableColors.map((color) => (
          <div
            key={color}
            onClick={() => onColorChange(color)}
            onMouseEnter={() => setHoveredColor(color)}
            onMouseLeave={() => setHoveredColor(null)}
            className={`inline-block p-0.5 rounded-full cursor-pointer ${
              color === selectedColor ? "ring-1 ring-blue-600" : ""
            }`}
          >
            <div
              className={`${getTailwindBgClass(
                color
              )} w-8 h-8 rounded-full border-2 border-gray-200`}
            />
            {hoveredColor === color && (
              <div className="absolute mt-2 p-2 bg-black text-white text-xs rounded shadow-lg">
                {colorNames[color]}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
