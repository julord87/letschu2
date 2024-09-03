export interface Product {
    //todo: id: string
    description: string;
    images: string[];
    price: number;
    colors: ValidColors[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    category: 'arnes'|'tiradores'|'chokers'|'ligas'|'extras';
}

export type ValidColors = 'negro'|'blanco'|'rojo'|'azul'|'verde'|'rosa'|'amarillo'|'gris'|'naranja'|'violeta'|'bordo'|'fucsia'|'beige'|'celeste'|'arcoiris'|'animal print'|'amarillo fluo'|'naranja fluo';
export type ValidTypes = 'superior'|'inferior'|'body'|'conjunto'|'tiradores'|'chookers'|'ligas'|'extras';
