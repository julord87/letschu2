"use client";

import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";

const CopyAddress = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("Piedras 325, Caballito, CABA").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Resetear el mensaje después de 2 segundos
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <p>Piedras 325, 4°3 , San Telmo, CABA</p>
      <button
        onClick={handleCopy}
        className="p-2 rounded-lg hover:bg-gray-200"
      >
        <IoCopyOutline />
      </button>
    </div>
  );
};

export default CopyAddress;
