import { NextRequest, NextResponse } from "next/server";
import { calculateShippingCostFlex } from "@/actions";

// Manejar solicitudes POST
export async function POST(req: NextRequest) {
  try {
    const { address, zip, weight, dimensions } = await req.json();
    const shippingCost = await calculateShippingCostFlex(address, zip, weight, dimensions);

    return NextResponse.json({ shippingCost });
  } catch (error) {
    console.error("Error en test-calculate-shipping-flex:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
  }
}
