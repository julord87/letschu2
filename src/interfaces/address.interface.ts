export interface Address {
  userId?: string;

  firstName: string;

  lastName: string;

  address: string;

  address2?: string;

  zip: string;

  city: string;

  country: string;

  province?: string | null;

  phone: string;

  shippingMethod?: "argentina" | "international" | "showroom";
}
