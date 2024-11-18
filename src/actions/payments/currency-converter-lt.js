"use server";

import CC from "currency-converter-lt";

export const convertToUSD = async (amount) => {
  try {
    // Instanciar el convertidor de monedas
    const currencyConverter = new CC({ from: "ARS", to: "USD", amount });

    // Realizar la conversión
    const convertedAmount = await currencyConverter.convert();

    // Retornar el monto convertido
    return {
      ok: true,
      convertedAmount: parseFloat(convertedAmount.toFixed(2)), // Redondeo a 2 decimales
    };
  } catch (error) {
    console.error("Error al convertir moneda:", error);

    return {
      ok: false,
      message: "No se pudo realizar la conversión de moneda.",
    };
  }
};
