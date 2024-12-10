"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (productId: string) => {
  try {
    // Elimina el producto y sus imágenes asociadas
    await prisma.$transaction(async (tx) => {
      await tx.productImage.deleteMany({
        where: { productId },
      });
      await tx.product.delete({
        where: { id: productId },
      });
    });

    // Revalidar rutas relacionadas
    revalidatePath("/admin/products");
    return { ok: true, message: "Producto eliminado correctamente." };
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return {
      ok: false,
      message: "Error al eliminar el producto.",
      details: error instanceof Error ? error.message : "Error desconocido",
    };
  }
};
