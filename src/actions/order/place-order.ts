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

    // Subtotal y total
    const { subTotal, total } = productIds.reduce((totals, item) => {

        const productQuantity = item.quantity;
        const product = products.find(p => p.id === item.productId);

        if( !product ) throw new Error(`${item.productId} no encontrado`);
        
        const subTotal = product.price * productQuantity;
        
        totals.subTotal += subTotal;
        totals.total += subTotal;

        return totals;

    }, {subTotal: 0, total: 0});

    // Crear la transacción de base de datos
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Actualizar el stock de los productos

      // 2. Crear la orden - Encabezado - Detalles
      const order = await tx.order.create({
        data: {
          userId: userId,
          subtotal: subTotal,
          total: total,
          itemsInOrder: itemsInOrder,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                color: p.color,
                productId: p.productId,
                price: products.find((pr) => pr.id === p.productId)?.price ?? 0,
              })),
            },
          },
        },
      });

      // Validar si el price es cero, entonces lanzar un error

      // 3. Crear la direccion de la orden
      // Address

      const orderAddress = await tx.orderAddress.create({
        data: {
          address: address.address,
          address2: address.address2,
          city: address.city,
          countryId: address.country,
          firstName: address.firstName,
          lastName: address.lastName,
          zip: address.zip,
          phone: address.phone,
          orderId: order.id,
        },
      });

      return {
        updatedProducts: [],
        order: order,
        orderAddress: orderAddress,
      };
    });

}