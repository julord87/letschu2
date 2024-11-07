"use server";

import { auth } from "@/auth.config";
import { Address, Colors } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId: string;
    quantity: number;
    color: Colors;
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {

    const session = await auth();
    const userId = session?.user.id;

    // Verificar sesión de usuario
    if( !userId ) {
        return {
            ok: false,
            message: "No hya sesión de usuario activa"
        }
    }

    // Obtener la información de los productos
    // Nota: recordar que podemos llevar 2 o + productos con el mismo ID
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map(({ productId }) => productId)
            }
        }
    })

    // Calcular los montos // Encabezado
    const itemsInOrder = productIds.reduce( (count, p) => count + p.quantity, 0);

    console.log({itemsInOrder});

}