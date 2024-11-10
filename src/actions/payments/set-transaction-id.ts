"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (transactionId: string, orderId: string) => {
    try {
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: { transactionId }
        });

        return {
            ok: true,
            order: updatedOrder
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Error al guardar el ID de la transacción"
        }
    }
}