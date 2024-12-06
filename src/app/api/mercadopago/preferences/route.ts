import { NextRequest, NextResponse } from "next/server";
import { Payment } from "mercadopago";
import { mercadopago } from "../api";
import api from "../api";


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar el ID en el cuerpo
    if (!body?.data?.id) {
      console.error("Cuerpo inválido:", body);
      return new Response("Bad Request: 'data.id' es requerido", { status: 400 });
    }

    console.log("ID recibido para procesar:", body.data.id);

    // Obtener el pago con el ID proporcionado
    const payment = await new Payment(mercadopago).get({ id: body.data.id });

    if (payment.status === "approved") {
      await api.message.add({
        id: payment.id!,
        text: payment.metadata.text!,
      });

      console.log("Pago aprobado y mensaje añadido.");
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error al procesar la notificación:", error.message);
    } else {
      console.error("Error al procesar la notificación:", error);
    }
    return new Response("Error al procesar la notificación", { status: 500 });
  }
}