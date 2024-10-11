"use client";

import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";

interface Props {
    quantity: number;

    onQuantityChange: (value : number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChange } : Props) => {

    const onValueChange = (value : number) => {
        if(quantity + value < 1) return;
        onQuantityChange(quantity + value);
    }

  return (
    <>
        <h3 className="font-bold mt-2">Cantidad</h3>

        <div className="flex">
            <button onClick={() => onValueChange(-1)}>
                <IoRemoveOutline size={18} /> 
            </button>

            <span className="w-10 mx-1 bg-gray-200 text-center rounded">
                {quantity}
            </span>

            <button onClick={() => onValueChange(+1)}>
                <IoAddOutline size={18} /> 
            </button>
        </div>
    </>
  )
}

