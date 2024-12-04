"use server";

export async function calculateShippingCostCorreo({
  cpDestino,
  provinciaDestino,
}: {
  cpDestino: string;
  provinciaDestino: string;
}): Promise<{ aSucursal: number; aDomicilio: number } | string> {
  const url = "https://correo-argentino1.p.rapidapi.com/calcularPrecio";
  const headers = {
    "Content-Type": "application/json",
    "x-rapidapi-host": "correo-argentino1.p.rapidapi.com",
    "x-rapidapi-key": "b4bb4baf84mshe456bc5485d1ea5p176a73jsn453e1a3bf146",
  };
  const cpOrigen = "1070";
  const provinciaOrigen = "AR-C";
  const peso = 0.35;

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
      throw new Error(`Error en la API de Correo Argentino: ${response.statusText}`);
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
    return "Error al comunicarse con la API";
  }
}
