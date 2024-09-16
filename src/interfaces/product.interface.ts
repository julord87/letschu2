export interface Product {
    //todo: id: string
    description: string;
    images: string[];
    price: number;
    colors: Colors[];
    slug: string;
    tags: string[];
    title: string;
    type: Types;
    category: Category;
}

export type Category = 'arnes'|'tiradores'|'chokers'|'ligas'|'extras';
export type Colors = 'negro'|'blanco'|'rojo'|'azul'|'verde'|'rosa'|'amarillo'|'gris'|'naranja'|'violeta'|'bordo'|'fucsia'|'beige'|'celeste'|'arcoiris'|'animal_print'|'amarillo_fluo'|'naranja_fluo';
export type Types = 'superior'|'inferior'|'body'|'conjunto'|'tiradores'|'chookers'|'ligas'|'extras';
