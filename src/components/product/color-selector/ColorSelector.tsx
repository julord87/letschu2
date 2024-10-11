import { getTailwindBgClass } from "@/helpers/color-translate";
import { Colors } from "@/interfaces";

interface Props {
  selectedColor?: Colors;
  availableColors: Colors[];

  onColorChange: (color: Colors) => void;
}

export const ColorSelector = ({ selectedColor, availableColors, onColorChange }: Props) => {

  return (
    <>
      <div className="my-5">
        <h3 className="font-bold mb-4">Colores disponibles</h3>
      </div>

      <div>
        {availableColors.map((color) => (
          <div
            key={color}
            onClick={() => onColorChange(color)}
            className={`inline-block p-0.5 rounded-full cursor-pointer ${
              color === selectedColor ? "ring-1 ring-blue-600" : ""
            }`}
          >
            <div
              className={`${getTailwindBgClass(
                color
              )} w-8 h-8 rounded-full border-2 border-gray-200`}
            />
          </div>
        ))}
      </div>
    </>
  );
};
