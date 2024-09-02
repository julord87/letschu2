export interface SeedProduct {
    //todo: id: string
    description: string;
    images: string[];
    price: number;
    colors: ValidColors[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    category: 'arnes'|'tirador'|'chokers'|'ligas'|'extras';
}

export type ValidColors = 'negro'|'blanco'|'rojo'|'azul'|'verde'|'rosa'|'amarillo'|'gris'|'naranja'|'violeta'|'bordo'|'fucsia'|'beige'|'celeste'|'arcoiris'|'animal print'|'amarillo fluo'|'naranja fluo';
export type ValidTypes = 'arnes-superior'|'arnes-inferior'|'body'|'conjunto'|'tirador'|'chookers'|'ligas'|'extras';
