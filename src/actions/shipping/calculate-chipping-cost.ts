"use server";

// Función auxiliar para calcular el costo de envío
export async function calculateShippingCost(
  method: "argentina" | "international" | "showroom"
): Promise<number> {
  if (method === "argentina") return 500; // Fijo
  if (method === "international") return 1500; // Fijo
  return 0; // Showroom u otros casos
}
