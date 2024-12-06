import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Validación básica
        if (!body.address_from || !body.address_to || !body.parcel) {
            return NextResponse.json(
                { error: "Faltan parámetros requeridos" },
                { status: 400 }
            );
        }

        const response = await fetch("https://api.goshippo.com/shipments/", {
            method: "POST",
            headers: {
                "Authorization": `ShippoToken shippo_test_1e1ef166fda2d9e9651295cd448d13882c0a4aed`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                address_from: body.address_from,
                address_to: body.address_to,
                parcels: [body.parcel],
                async: false,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json({ error }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error al comunicarse con Shippo:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}
