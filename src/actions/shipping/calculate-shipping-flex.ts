"use server";

export async function calculateShippingCostFlex(
  address: string,
  postalCode: string,
  weight: number,
  dimensions: { length: number; width: number; height: number }
): Promise<number> {
  const token = process.env.MP_ACCESS_TOKEN;

  if (!token) {
    throw new Error("Access token for Mercado Envíos Flex is not configured.");
  }

  const response = await fetch("https://api.mercadolibre.com/flex/shipping-cost", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      destination: { address, postalCode },
      package: { weight, dimensions },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Error fetching shipping cost: ${error.message}`);
  }

  const data = await response.json();
  return data.shipping_cost;
}
