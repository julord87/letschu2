"use server";


import { redirect } from "next/navigation";
import { createMercadoPagoPreference } from "./create-mercado-pago-preference";

export async function add(formData: FormData) {
  const orderId = formData.get("orderId") as string;
  const amount = Number(formData.get("amount"));

  if (!orderId || isNaN(amount)) {
    throw new Error("Datos insuficientes para procesar el pago.");
  }

  const { preferenceId } = await createMercadoPagoPreference(orderId);

  // Redirige al usuario al flujo de pago de Mercado Pago
  const redirectUrl = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`;
  redirect(redirectUrl);
}
