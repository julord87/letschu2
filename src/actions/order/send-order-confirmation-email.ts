"use server";

import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
import path from "path";

export const sendOrderConfirmationEmail = async (orderId: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        OrderItem: {
          include: { product: true },
        },
        user: true,
      },
    });

    const orderAdress = await prisma.orderAddress.findUnique({
      where: { orderId },
    });

    if (!order) throw new Error("Orden no encontrada");

    // Verificar si ya se envió el correo
    if (order.confirmationEmailSent) {
      return { ok: true, message: "El correo ya fue enviado anteriormente" };
    }

    const user = order.user;
    const address = orderAdress;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Generar HTML del correo
    const itemsHtml = order.OrderItem.map(
      (item) => `
        <tr>
          <td>${item.product.title}</td>
          <td>${item.quantity}</td>
          <td>${item.price}</td>
          <td>${item.quantity * item.price}</td>
        </tr>
      `
    ).join("");

    const html = `
      <h1>Gracias por tu compra, ${user.name}!</h1>
      <p>Tu orden #${orderId.split("-")[0]} ha sido confirmada.</p>
      <h2>Detalles de tu orden:</h2>
      <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      <h3>Total: ${order.total}</h3>
      <p>Dirección de envío:</p>
      <p>${order} ${address?.firstName}</p>
      <p>${address?.address}, ${address?.city}, ${address?.countryId}</p>
      <p>Teléfono: ${address?.phone}</p>
      <br/>
        <p>Si realizaste una compra con envio incluído, enviaremos un correo con el enlace de seguimiento en los próximos días. Si no recibiste el correo, revisa tu bandeja de spam.</p>
      <br/>
        <p>Gracias por comprar en letsChu!</p>
      <br/>
      <img src="cid:logo" alt="Logo" style="width: 150px; height: auto;" />
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Confirmación de compra",
      html,
      attachments: [
        {
          filename: "logo.png",
          path: path.join(process.cwd(), "public/imgs/logo.png"),
          cid: "logo",
        },
      ],
    });

    // Actualizar la orden después de enviar el correo
    await prisma.order.update({
      where: { id: orderId },
      data: { confirmationEmailSent: true },
    });

    return { ok: true, message: "Correo enviado con éxito" };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al enviar el correo de confirmación" };
  }
};
