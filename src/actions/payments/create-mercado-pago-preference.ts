import prisma from "@/lib/prisma";

export async function createMercadoPagoPreference(orderId: string) {
  // 1. Obtén la orden desde Prisma
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      OrderItem: {
        include: { product: true },
      },
      user: true,
    },
  });

  if (!order) throw new Error("Order not found");

  // 2. Busca la dirección de la orden
  const orderAddress = await prisma.orderAddress.findUnique({
    where: { orderId: order.id },
    include: { country: true },
  });

  if (!orderAddress) throw new Error("Order address not found");

  // 3. Construye los datos para la preferencia de Mercado Pago
  const preferenceData = {
    items: [
      ...order.OrderItem.map((item) => ({
        title: item.product.title,
        unit_price: item.price,
        quantity: item.quantity,
      })),
      // Agregar un ítem para el costo de envío
      {
        title: "Costo de envío",
        unit_price: order.shippingCost,
        quantity: 1,
      },
    ],
    payer: {
      name: orderAddress.firstName,
      surname: orderAddress.lastName,
      email: order.user.email,
    },
    external_reference: orderId,
    back_urls: {
      success: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderId}`,
      failure: `${process.env.NEXT_PUBLIC_APP_URL}/error`,
      pending: `${process.env.NEXT_PUBLIC_APP_URL}/orders/${orderId}`,
    },
    auto_return: "approved",
  };

  // 4. Llama a la API de Mercado Pago
  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
    },
    body: JSON.stringify(preferenceData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error al crear preferencia", errorData);
    throw new Error("No se pudo crear la preferencia de Mercado Pago.");
  }

  const preference = await response.json();
  return { preferenceId: preference.id };
}
