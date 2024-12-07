import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parseamos el body de la notificación
    const notification = await request.json();
    const { type, data } = notification;

    if (type === "payment") {
      const paymentId = data.id;

      // Realizamos una petición para obtener los detalles del pago
      const response = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        console.error("Error al obtener detalles del pago", await response.json());
        return new Response("Error fetching payment details", { status: 500 });
      }

      const payment = await response.json();

      // Validamos el estado del pago
      if (payment.status === "approved") {
        console.log(`Pago aprobado: ${payment.id}`);

        // Aquí puedes realizar actualizaciones en la base de datos
        // Por ejemplo, marcar la orden como pagada:
        /*
        await prisma.order.update({
          where: { id: payment.external_reference },
          data: { isPaid: true, paidAt: new Date() },
        });
        */
      }
    }

    // Respondemos con éxito para evitar reintentos de notificación
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Error procesando la notificación de Mercado Pago:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
