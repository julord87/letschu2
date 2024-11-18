"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const resetPassword = async (
  state: { ok: boolean; message?: string } | undefined,
  payload: { token: string; password: string }
) => {
  const { token, password } = payload;

  try {
    const user = await prisma.user.findFirst({
      where: { resetToken: token, resetTokenExpiry: { gt: new Date() } },
    });

    if (!user) {
      throw new Error("Token inválido o expirado");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return { ok: true, message: "Contraseña actualizada con éxito" };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al resetear la contraseña" };
  }
};
