import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Llama a la API de MercadoPago para obtener los detalles del pago
async function getPaymentDetails(paymentId: string) {
  const response = await fetch(
    `https://api.mercadopago.com/v1/payments/${paymentId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    console.error(
      "Error al obtener los detalles del pago:",
      await response.json()
    );
    throw new Error("No se pudo obtener los detalles del pago");
  }

  return response.json();
}

export async function POST(request: Request) {
  try {
    const notification = await request.json();
    const { type, data, action } = notification;

    console.log("Notificación recibida:", notification);

    if (
      type === "payment" &&
      (action === "payment.updated" || action === "payment.created")
    ) {
      const paymentId = data.id;
      console.log(`ID de pago recibido: ${paymentId}`);

      // Realizamos la petición para obtener los detalles del pago
      const response = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        console.error(
          "Error al obtener detalles del pago",
          await response.json()
        );
        return new Response("Error fetching payment details", { status: 500 });
      }

      const payment = await response.json();
      console.log("Detalles del pago:", payment);

      if (payment.status === "approved") {
        console.log(`Pago aprobado: ${payment.id}`);

        // Verificar si el pago ya fue procesado
        const alreadyProcessed = await prisma.order.findFirst({
          where: {
            id: payment.external_reference,
            isPaid: true,
          },
        });

        if (alreadyProcessed) {
          console.log(`El pago ${payment.id} ya fue procesado.`);
          return new Response("Pago ya procesado", { status: 200 });
        }

        // Actualizamos la orden en la base de datos
        const updatedOrder = await prisma.order.update({
          where: { id: payment.external_reference },
          data: { isPaid: true, paidAt: new Date() },
        });

        console.log(`Orden actualizada: ${updatedOrder.id}`);
      }
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Error procesando la notificación de Mercado Pago:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
