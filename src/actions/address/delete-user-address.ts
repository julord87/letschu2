"use server";

import prisma from "@/lib/prisma";



export const deleteUserAddress = async (userId: string) => {

    try {

        await prisma.userAddress.delete({
            where: { userId }
        });

        return {
            ok: true,
            message: "Dirección eliminada"
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: "Error al eliminar la dirección"
        }        
    }
};

