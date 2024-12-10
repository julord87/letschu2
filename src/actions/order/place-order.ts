"use server";

import { auth } from "@/auth.config";
import { Address, Colors } from "@/interfaces";
import prisma from "@/lib/prisma";
import { calculateShippingCost } from "../shipping/calculate-chipping-cost";
import { calculateShippingCostCorreo } from "../shipping/calculate-shipping-cost-correo";

interface ProductToOrder {
  productId: string;
  quantity: number;
  color?: Colors; // Hacer color opcional
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address,
  shippingMethod: "argentina" | "international" | "showroom"
): Promise<{
  ok: boolean;
  order?: any;
  breakdown?: {
    subtotal: number;
    shippingCost: number;
    total: number;
  };
  message?: string;
}> => {
  console.log("placeOrder called with:", {
    productIds,
    address,
    shippingMethod,
  });

  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: "No hay sesión de usuario activa",
    };
  }

  let shippingCost = 0;

  // Calcular el costo de envío según el método
  if (shippingMethod === "argentina") {
    const correoResult = await calculateShippingCostCorreo({
      cpDestino: address.zip,
      provinciaDestino: address.province,
    });

    if (typeof correoResult === "string") {
      return {
        ok: false,
        message: correoResult, // Error en el cálculo del costo
      };
    }

    shippingCost = correoResult.aDomicilio; // Usar aDomicilio o aSucursal según necesidad
  } else if (shippingMethod === "international") {
    shippingCost = await calculateShippingCost(shippingMethod);
    if (shippingCost < 0) {
      return {
        ok: false,
        message: "Error al calcular el costo de envío internacional.",
      };
    }
  } else {
    // Showroom: envío gratis
    shippingCost = 0;
  }

  // Validar productos en el carrito
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map(({ productId }) => productId),
      },
    },
  });

  if (products.length !== productIds.length) {
    return {
      ok: false,
      message: "Uno o más productos en el carrito no existen.",
    };
  }

  // Calcular subtotales y totales
  const { subTotal } = productIds.reduce(
    (totals, item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new Error(`Producto con ID ${item.productId} no encontrado`);
      }

      totals.subTotal += product.price * item.quantity;
      return totals;
    },
    { subTotal: 0 }
  );

  const orderItems = productIds.map((p) => {
    const colorValue = p.color ?? undefined; // Cambiar null a undefined si no es permitido
    return {
      quantity: p.quantity,
      color: colorValue,
      productId: p.productId,
      price: products.find((pr) => pr.id === p.productId)?.price ?? 0,
    };
  });

  const total = subTotal + shippingCost;

  // Realizar transacción en Prisma
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // Crear orden
      const order = await tx.order.create({
        data: {
          userId,
          subtotal: subTotal,
          total,
          itemsInOrder: productIds.reduce((count, p) => count + p.quantity, 0),
          shippingMethod,
          shippingCost,
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                color: p.color ?? null,
                productId: p.productId,
                price: products.find((pr) => pr.id === p.productId)?.price ?? 0,
              })),
            },
          },
        },
      });

      // Crear dirección asociada a la orden
      const orderAddress = await tx.orderAddress.create({
        data: {
          firstName: address.firstName,
          lastName: address.lastName,
          address: address.address,
          address2: address.address2 || null,
          zip: address.zip,
          city: address.city,
          phone: address.phone,
          countryId: address.country,
          provinceId: address.province || null,
          orderId: order.id,
        },
      });

      return { order, orderAddress };
    });

    return {
      ok: true,
      order: prismaTx.order,
      breakdown: {
        subtotal: subTotal,
        shippingCost,
        total,
      },
    };
  } catch (error) {
    console.error("Error en la transacción Prisma:", error);
    return { ok: false, message: "Error interno al procesar la orden." };
  }
};
