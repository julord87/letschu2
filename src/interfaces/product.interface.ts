export interface Product {
    category?: any;
    id: string
    description: string;
    images: string[];
    price: number;
    colors: Colors[];
    slug: string;
    tags: string[];
    title: string;
    shippingCompanies: ShippingCompanies[];
}

export interface CartProduct {
    id: string;
    slug: string;
    title: string;
    price: number;
    quantity: number;
    color?: Colors;
    courier?: ShippingCompanies;
    image: string;
    category?: Category;
}

export interface ProductImage {
    id: string | number;
    url: string;
    productId?: string;
}

type Category = 'arnes'|'tiradores'|'chokers'|'ligas'|'extras'|'envios';
export type Colors = 'negro'|'blanco'|'rojo'|'azul'|'verde'|'rosa'|'amarillo'|'gris'|'naranja'|'violeta'|'bordo'|'fucsia'|'beige'|'celeste'|'arcoiris'|'animal_print'|'amarillo_fluo'|'naranja_fluo';
export type ShippingCompanies = 'correo_argentino'|'fedex'|'dhl'|'oca'|'andreani'|'ups';
type Types = 'superior'|'inferior'|'body'|'conjunto'|'tiradores'|'chookers'|'ligas'|'extras';
