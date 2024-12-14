"use server";

export async function calculateShippingCostCorreo({
  cpOrigen,
  cpDestino,
  provinciaOrigen,
  provinciaDestino,
  peso,
}: {
  cpOrigen: string;
  cpDestino: string;
  provinciaOrigen: string;
  provinciaDestino: string;
  peso: number;
}): Promise<{ aSucursal: number; aDomicilio: number } | string> {
  const url = "https://correo-argentino1.p.rapidapi.com/calcularPrecio";
  const headers = {
    "Content-Type": "application/json",
    "x-rapidapi-host": "correo-argentino1.p.rapidapi.com",
    "x-rapidapi-key": "b4bb4baf84mshe456bc5485d1ea5p176a73jsn453e1a3bf146",
  };

  const body = {
    cpOrigen,
    cpDestino,
    provinciaOrigen,
    provinciaDestino,
    peso,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error en la API de Correo Argentino: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    if (data?.paqarClasico) {
      return {
        aSucursal: data.paqarClasico.aSucursal,
        aDomicilio: data.paqarClasico.aDomicilio,
      };
    }

    return "No se pudo calcular el costo de envío";
  } catch (error) {
    console.error("Error calculando el costo de envío:", error);
    const errorText = error instanceof Error ? error.message : "";
    return errorText || "Ocurrió un error al calcular el costo de envío.";
  }
}
