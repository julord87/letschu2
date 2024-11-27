"use server";

import { auth } from "@/auth.config";
import { Address, Colors } from "@/interfaces";
import prisma from "@/lib/prisma";
import { calculateShippingCost } from "../shipping/calculate-shipping-cost";

interface ProductToOrder {
  productId: string;
  quantity: number;
  color: Colors;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address,
  shippingMethod: "argentina" | "international" | "showroom"
) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: "No hay sesión de usuario activa",
    };
  }

  // Calcular el costo de envío basado en el método proporcionado
  const shippingCost = await calculateShippingCost(shippingMethod);

  if (!shippingMethod || shippingCost < 0) {
    return {
      ok: false,
      message: "Método de envío inválido o no soportado.",
    };
  }

  // Obtener la información de los productos
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map(({ productId }) => productId),
      },
    },
  });

  // Calcular montos
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  const { subTotal } = productIds.reduce(
    (totals, item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) throw new Error(`${item.productId} no encontrado`);

      const subTotal = product.price * item.quantity;
      totals.subTotal += subTotal;
      return totals;
    },
    { subTotal: 0 }
  );

  const total = subTotal + shippingCost;

  // Transacción en Prisma
  const prismaTx = await prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId,
        subtotal: subTotal,
        total,
        itemsInOrder,
        shippingMethod,
        shippingCost,
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
      order,
      orderAddress,
    };
  });

  return {
    ok: true,
    order: prismaTx.order,
    breakdown: {
      subtotal: subTotal,
      shippingCost,
      total,
    },
    prismaTx,
  };
};
