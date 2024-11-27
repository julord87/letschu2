export interface Address {
  userId?: string;

  firstName: string;

  lastName: string;

  address: string;

  address2?: string;

  zip: string;

  city: string;

  country: string;

  phone: string;

  shippingMethod?: "argentina" | "international" | "showroom";
}
