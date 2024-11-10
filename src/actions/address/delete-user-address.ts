"use server";

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
    try {
        const address = await prisma.userAddress.findUnique({
            where: { userId },
        });

        if (!address) {
            return {
                ok: false,
                message: "La dirección no existe",
            };
        }

        await prisma.userAddress.delete({
            where: { userId },
        });

        return {
            ok: true,
            message: "Dirección eliminada",
        };

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Error al eliminar la dirección",
        };
    }
};
