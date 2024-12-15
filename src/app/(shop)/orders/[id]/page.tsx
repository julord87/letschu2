import {
  calculateShippingCost,
  convertToUSD,
  getOrderById,
  sendOrderConfirmationEmail,
} from "@/actions";
import { MercadoPagoButton, OrderStatus, PayPalButton } from "@/components";
import Title from "@/components/ui/title/Title";
import { currencyFormat } from "@/helpers/currencyFormat";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ResumenOrder } from "../../checkout/address/ui/ResumenOrder";
import { useCartStore } from "@/store";
import { ClearCart } from "./ui/ClearCart";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrdersByIdPage({ params }: Props) {
  const { id } = params;
  const { ok, order } = await getOrderById(id);

  if (!ok || !order) {
    redirect("/");
    return null;
  }

  if (order.isPaid) {
    await sendOrderConfirmationEmail(order.id);
  }

  const address = order!.OrderAddress;
  let convertedAmount: number | null = null;
  let conversionError = null;
  
  const validShippingMethod =
    order.shippingMethod === "argentina" ||
    order.shippingMethod === "international" ||
    order.shippingMethod === "showroom"
      ? order.shippingMethod
      : "argentina";
  const shippingCost = await calculateShippingCost(validShippingMethod);
  const totalWithShipping = order.subtotal + order.shippingCost;

  try {
    const USDOrderResult = await convertToUSD(totalWithShipping);
    if (USDOrderResult.ok) {
      convertedAmount = USDOrderResult.convertedAmount ?? null;
    } else {
      conversionError = USDOrderResult.message;
    }
  } catch {
    conversionError = "Error inesperado al convertir el monto.";
  }


  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
        <ClearCart ok={ok} />
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split("-")[0]}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order?.isPaid ?? false} />

            {/* Items */}
            {order!.OrderItem.map((item) => (
              <div
                key={item.product.slug + "-" + item.color}
                className="flex mb-5"
              >
                <Image
                  src={item.product.ProductImage[0].url}
                  alt={item.product.title}
                  width={130}
                  height={130}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  className="mr-5 rounded object-cover"
                />

                <div>
                  <p>{item.product.title}</p>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout - Resumen de orden*/}
          <div className="bg-white rounded-xl shadow-xl p-7">
            {address && (
              <ResumenOrder
                order={order}
                address={address}
                countryId={address.countryId}
              />
            )}

            {/* Divider */}
            <div className="w-full h-[1px] bg-gray-200 rounded mb-8"></div>

            <h2 className="text-2xl mb-2 font-bold">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order?.itemsInOrder === 1
                  ? "1 artículo"
                  : `${order?.itemsInOrder} artículos`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subtotal)}
              </span>

              <span>Costo de envío</span>
              <span className="text-right">
                {order.shippingCost
                  ? currencyFormat(order.shippingCost)
                  : "Gratis"}
              </span>

              <span className="text-2xl font-semibold mt-3">Total</span>
              <span className="text-right text-2xl font-semibold mt-3">
                {currencyFormat(totalWithShipping!)}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {order?.isPaid ? (
                <OrderStatus isPaid={order?.isPaid ?? false} />
              ) : conversionError ? (
                // Mostrar mensaje de error si la conversión falla
                <p className="text-red-500 text-center">{conversionError}</p>
              ) : (
                // Renderizar PayPalButton y MercadoPagoButton con el monto convertido
                <>
                  <MercadoPagoButton
                    orderId={order!.id}
                    amount={totalWithShipping!}
                  />
                  <PayPalButton amount={convertedAmount!} orderId={order!.id} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
