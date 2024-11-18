"use server";

import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
import { randomUUID } from "crypto";

export const sendResetEmail = async (
  state: { ok: boolean; message?: string } | undefined,
  payload: { email: string }
) => {
  const { email } = payload; // Extraemos el email del payload
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("Usuario no encontrado");

    const token = randomUUID();
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password/${token}`;

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiry: new Date(Date.now() + 3600 * 1000), // Expira en 1 hora
      },
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Recuperación de contraseña",
      html: `<p>Haz clic en el enlace para resetear tu contraseña:</p>
      <a href="${resetLink}">${resetLink}</a>`,
    });

    return { ok: true, message: "Correo enviado con éxito" };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al enviar el correo de recuperación" };
  }
};
