import { NextRequest, NextResponse } from "next/server";
import { calculateShippingCostCorreo } from "@/actions";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { cpOrigen, cpDestino, provinciaOrigen, provinciaDestino, peso } = body;

    const shippingCost = await calculateShippingCostCorreo({
      cpOrigen,
      cpDestino,
      provinciaOrigen,
      provinciaDestino,
      peso,
    });

    return NextResponse.json({ shippingCost });
  } catch (error) {
    console.error("Error en el endpoint de cálculo de costo:", error);
    return NextResponse.json(
      { error: "Error al calcular el costo de envío" },
      { status: 500 }
    );
  }
}
