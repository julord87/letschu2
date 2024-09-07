"use client";
import { useState } from "react";
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";

interface Props {
    quantity: number;
}

export const QuantitySelector = ({ quantity } : Props) => {

    const [count, setCount] = useState(quantity);

    const onQuantityChange = (value : number) => {
        if(count + value < 1) return;
        setCount(count + value);
    }

  return (
    <>
        <h3 className="font-bold mt-2">Cantidad</h3>

        <div className="flex">
            <button onClick={() => onQuantityChange(-1)}>
                <IoRemoveOutline size={18} /> 
            </button>

            <span className="w-10 mx-1 bg-gray-200 text-center rounded">
                {count}
            </span>

            <button onClick={() => onQuantityChange(+1)}>
                <IoAddOutline size={18} /> 
            </button>
        </div>
    </>
  )
}

