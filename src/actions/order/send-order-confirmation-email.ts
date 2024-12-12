"use server";

import { currencyFormat } from "@/helpers/currencyFormat";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
import path from "path";

export const sendOrderConfirmationEmail = async (orderId: string) => {

  const colorNameFormater = (color: string): string => {
    return color.replace(/_/g, ' ');
  };

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
          <td>${item.product.title} - ${colorNameFormater(item.color || "")}</td>
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
      <h3>Total: $${currencyFormat(order.total)}</h3>
      <p>Dirección de envío:</p>
      <p>${address?.address}, ${address?.city}, ${address?.countryId}</p>
      <p>Código postal: ${address?.zip}</p>
      <p>A nombre de: ${address?.firstName} ${address?.lastName}</p>
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

        // Generar HTML del correo para el administrador
        const htmlAdmin = `
        <h1>Notificación de nuevo pago recibido</h1>
        <p>Se ha recibido un nuevo pago de la orden #${orderId.split("-")[0]}.</p>
        <h2>Detalles del comprador:</h2>
        <p>Nombre: ${user.name}</p>
        <p>Correo: ${user.email}</p>
        <h2>Detalles de la orden:</h2>
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
        <h3>Total: ${currencyFormat(order.total)}</h3>
        <p>Dirección de envío:</p>
        <p>${address?.address}, ${address?.city}, ${address?.countryId}</p>
        <p>Código postal: ${address?.zip}</p>
        <p>A nombre de: ${address?.firstName} ${address?.lastName}</p>
        <p>Teléfono: ${address?.phone}</p>
      `;
  
      // Enviar correo al dueño del ecommerce
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Correo del administrador
        subject: "Nuevo pago recibido",
        html: htmlAdmin,
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
