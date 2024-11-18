"use client";

import { PayPalButtons, usePayPalScriptReducer, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CreateOrderActions, CreateOrderData, OnApproveActions, OnApproveData } from "@paypal/paypal-js";
import { payPalCheckPayment, setTransactionId } from "@/actions";
import { constants } from "os";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({orderId, amount}: Props) => {

  const roundedAmount = Math.round( amount * 100 ) / 100;

  const [{ isPending }] = usePayPalScriptReducer();

  if( isPending ) {
    return (
      <div className="animate-pulse">
        <div className="h-12 bg-gray-300 rounded mb-4" />
        <div className="h-12 bg-gray-300 rounded mt-2" />
      </div>
    )
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: "USD",
            value: `${roundedAmount}`
          }
        }
      ],
      intent: "CAPTURE"
    });
  
    const { ok } = await setTransactionId(transactionId, orderId);

    if( !ok ) {
      throw new Error("Error al guardar el ID de la transacción");
    }
  
    return transactionId;
  };

  const onApprove = async ( data: OnApproveData, actions: OnApproveActions ) => {
    const details = await actions.order?.capture();
    if( !details ) return;

    if (details.id) {
      await payPalCheckPayment(details.id);
    } else {
      throw new Error("Transaction ID is undefined");
    }
  }
  

    return (
      <div className="relative z-0">
        <PayPalButtons 
          createOrder={ createOrder }
          onApprove={ onApprove }
        />
      </div>
    )
  }
  
  export default function App() {
    return (
      <div style={{ maxWidth: "750px", minHeight: "200px" }}>
        <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "ARS" }}>
          <PayPalButtons />
        </PayPalScriptProvider>
      </div>
    );
  }

