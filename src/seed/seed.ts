interface SeedProduct {
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

type ValidColors = 'negro'|'blanco'|'rojo'|'azul'|'verde'|'rosa'|'amarillo'|'gris'|'naranja'|'violeta'|'bordo'|'fucsia'|'beige'|'celeste'|'arcoiris'|'animal print'|'amarillo fluo'|'naranja fluo';
type ValidTypes = 'arnes-superior'|'arnes-inferior'|'body'|'conjunto'|'tirador'|'chookers'|'ligas'|'extras';

interface SeedData {
    products: SeedProduct[],
}




export const initialData: SeedData = {
    products: [
        {
            "description": "Arnés superior confeccionado a medida, hecho de cinta de polipropileno de 30 mm en color negro con detalles en color a elección y piezas metálicas. Ajustable en todos sus lados para un calce perfecto.",
            "images": [
                "https://acdn.mitiendanube.com/stores/001/477/757/products/pet071-e7e11f46dfbb3ba2bd16176498132105-240-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/pet061-626c49b3f9520e397516176488417776-240-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/pet091-b271203cbf6e18e95d16176488417712-240-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/pet011-54523d7c49ad0dbe5216176488416692-240-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/petsolo1-0cac75832310da1e2b16176660930397-240-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/pet031-d6dea5eaedf25a5e8016176494610908-240-0.webp"
            ],  
            "price": 31500,
            "slug": "arnes-superior",
            "type": "arnes-superior",
            "tags": ["arnés", "superior", "ajustable", "hecho a medida"],
            "title": "ARNÉS PET",
            "category": "arnes",
            "colors": [
                "negro", "blanco", "rojo", "azul", "verde", "rosa", "amarillo", 
                "gris", "naranja", "violeta", "bordo", "fucsia", "beige", 
                "celeste", "arcoiris", "animal print", "amarillo fluo", "naranja fluo"
            ]
        },
        {
            "description": "Arnés body confeccionado a medida con elástico afelpado y piezas metálicas, asegurando un calce perfecto y ajustable en todos sus lados. Se requiere medida de contorno de bajobusto, cintura y pierna, o datos de talla de ropa.",
            "images": [
                "https://acdn.mitiendanube.com/stores/001/477/757/products/amnesia011-c9b88576520cebebf416190537045759-240-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/amnesia041-d5e48c0e9f77b02dec16190537053003-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/amnesia031-a44ed1cebd54a5e2cc16190537058265-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/amnesia051-1ca6d52230305166f416190537058199-640-0.webp"
            ],
            "price": 53900,
            "slug": "arnes-body-amnesia",
            "type": "arnes-superior",
            "tags": ["arnés", "body", "ajustable", "a medida"],
            "title": "ARNÉS BODY AMNESIA",
            "category": "arnes",
            "colors": ["negro", "blanco", "rojo", "azul", "verde", "rosa", "amarillo", "gris", "naranja", "violeta", "bordo", "fucsia", "beige", "celeste", "arcoiris", "animal print", "amarillo fluo", "naranja fluo"],
        },      
        {
            "description": "Arnés superior confeccionado a medida con cinta de polipropileno color negro y piezas metálicas. No incluye choker. Ajustable en todos sus lados para un calce perfecto. Se requiere medida de contorno de busto/pecho o datos de talla de ropa.",
            "images": [
                "https://acdn.mitiendanube.com/stores/001/477/757/products/holo021-a08af907c67e442b9116176530848403-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/holo041-b5f1707c220f7a197e16176530848817-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/holo031-d702fa56bc7932094116176530849320-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/holo061-05ab34484dc308ccc016176530850134-640-0.webp",
            ],
            "price": 32000,
            "slug": "arnes-holo",
            "type": "arnes-superior",
            "tags": ["arnés", "superior", "ajustable", "a medida"],
            "title": "ARNÉS HOLO",
            "category": "arnes",
            "colors": ["negro", "blanco", "rojo", "azul", "verde", "rosa", "amarillo", "gris", "naranja", "violeta", "bordo", "fucsia", "beige", "celeste", "arcoiris", "animal print", "amarillo fluo", "naranja fluo"]
        },
        {
            "description": "Arnés de pecho con hombros desmontables, regulable y con opción de color a elección. Ajustable en todos sus lados para un calce perfecto.",
            "images": [
                "https://acdn.mitiendanube.com/stores/001/477/757/products/screenshot_20230616-121755_drive1-16e7b81922d498866b16869289346241-480-0.webp",
            ],
            "price": 54500,
            "slug": "arnes-vadik",
            "type": "arnes-superior",
            "tags": ["arnés", "pecho", "hombros desmontables", "ajustable", "a medida"],
            "title": "ARNÉS VADIK",
            "category": "arnes",
            "colors": ["negro", "blanco", "rojo", "azul", "verde", "rosa", "amarillo", "gris", "naranja", "violeta", "bordo", "fucsia", "beige", "celeste", "arcoiris", "animal print", "amarillo fluo", "naranja fluo"]
        },
        {
            "description": "Arnés superior confeccionado a medida con cinta de polipropileno de 30 mm en color negro y detalles en color a elección, junto con piezas metálicas. Ajustable en todos sus lados para un calce perfecto. Se requiere medida de contorno de bajobusto o datos de talla de ropa.",
            "images": [
                "https://acdn.mitiendanube.com/stores/001/477/757/products/xena011-5b2f540c39f39adb7f16176491654493-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/xena031-5ee87db617725598ea16176491652455-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/xena041-4a67e285a13502df0316177451389278-640-0.webp"
            ],
            "price": 36500,
            "slug": "arnes-xena",
            "type": "arnes-superior",
            "tags": ["arnés", "superior", "ajustable", "a medida"],
            "title": "ARNÉS XENA",
            "category": "arnes",
            "colors": ["negro", "blanco", "rojo", "azul", "verde", "rosa", "amarillo", "gris", "naranja", "violeta", "bordo", "fucsia", "beige", "celeste", "arcoiris", "animal print", "amarillo fluo", "naranja fluo"]
        },
        {
            "description": "Arnés superior confeccionado a medida con elástico afelpado y piezas metálicas. Ajustable en todos sus lados para un calce perfecto. Se requiere medida de contorno de bajobusto o datos de talla de ropa.",
            "images": [
                "https://acdn.mitiendanube.com/stores/001/477/757/products/bombsimple031-b693918be950ed1c3516176447877299-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/bombsimple001-bbd41022eb4a5075d716176655298560-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/bombsimpleee1-0885100f16cd9d04a516176655300251-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/bomb041-5e2357bb27e7d5435716176447875872-640-0.webp"
            ],
            "price": 28000,
            "slug": "arnes-bomb",
            "type": "arnes-superior",
            "tags": ["arnés", "superior", "ajustable", "a medida"],
            "title": "ARNÉS BOMB",
            "category": "arnes",
            "colors": ["negro", "blanco", "rojo", "azul", "verde", "rosa", "amarillo", "gris", "naranja", "violeta", "bordo", "fucsia", "beige", "celeste", "arcoiris", "animal print", "amarillo fluo", "naranja fluo"]
        },
        {
            "description": "Arnés superior confeccionado a medida con cinta de polipropileno color negro y detalles en color a elección, junto con piezas metálicas. No incluye esposas ni arnés de piernas. Ajustable en todos sus lados para un calce perfecto. Se requiere medida de contorno de busto/pecho y cuello o datos de talla de ropa.",
            "images": [
                "https://acdn.mitiendanube.com/stores/001/477/757/products/20220827_232405-afd70e3101b268503716616534865389-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/black0031-a7f5b8bf6d6eab6dbe16613608833383-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/blackconjunt1-94cf8caee35c147cea16613608834061-640-0.webp"
            ],
            "price": 32200,
            "slug": "arnes-superior-black",
            "type": "arnes-superior",
            "tags": ["arnés", "superior", "ajustable", "a medida", "negro"],
            "title": "ARNÉS SUPERIOR BLACK",
            "category": "arnes",
            "colors": ["negro", "blanco", "rojo", "azul", "verde", "rosa", "amarillo", "gris", "naranja", "violeta", "bordo", "fucsia", "beige", "celeste", "arcoiris", "animal print", "amarillo fluo", "naranja fluo"]
        },
        {
            "description": "Arnés superior confeccionado a medida con cinta de polipropileno de 30 mm en color negro y detalles en color a elección, junto con piezas metálicas. Ajustable en todos sus lados para un calce perfecto. Se requiere medida de contorno de bajobusto o datos de talla de ropa.",
            "images": [
                "https://acdn.mitiendanube.com/stores/001/477/757/products/screenshot_20220707-111933_drive-c8c7a2a58cc8fd253f16572037006662-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/screenshot_20220707-111943_drive-d792bf740166eca46e16572037006809-240-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/20220611_122555-9037d943e57ccf811716549965270464-240-0.webp",
            ],
            "price": 41500,
            "slug": "arnes-superior-viko",
            "type": "arnes-superior",
            "tags": ["arnés", "superior", "ajustable", "a medida"],
            "title": "ARNÉS SUPERIOR VIKO",
            "category": "arnes",
            "colors": ["negro", "blanco", "rojo", "azul", "verde", "rosa", "amarillo", "gris", "naranja", "violeta", "bordo", "fucsia", "beige", "celeste", "arcoiris", "animal print", "amarillo fluo", "naranja fluo"]
        },








        {
            "description": "Arnés de cola confeccionado a medida con cinta de polipropileno color negro con detalles y piezas metálicas. No incluye esposas ni conectores. Ajustable en todos sus lados para un calce perfecto. Se requiere medida de contorno de cintura, contorno de pierna (donde sea más grande el muslo) y contorno de cola, o datos de talla de jean o pantalón.",
            "images": [
                "https://acdn.mitiendanube.com/stores/001/477/757/products/img_20210916_182539_145-7b9bf1797106b598fa16318811381566-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/20210916_150303-eceb3abc0244ed477316318811382852-640-0.webp"
            ],
            "price": 34700,
            "slug": "arnes-inferior-rush",
            "type": "arnes-inferior",
            "tags": ["arnés", "inferior", "ajustable", "a medida", "negro"],
            "title": "ARNÉS INFERIOR RUSH",
            "category": "arnes",
            "colors": ["negro", "blanco", "rojo", "azul", "verde", "rosa", "amarillo", "gris", "naranja", "violeta", "bordo", "fucsia", "beige", "celeste", "arcoiris", "animal print", "amarillo fluo", "naranja fluo"]
        },
        










        {
            "description": "Arnés body de una sola pieza confeccionado a medida con elástico afelpado y piezas metálicas, asegurando un calce perfecto y ajustable en todos sus lados. Se requiere medida de contorno de bajobusto, cintura, largo de espalda y contorno de pierna, o datos de talla de ropa.",
            "images": [
                "https://acdn.mitiendanube.com/stores/001/477/757/products/gema0021-1cdf4764e7800cba2116276163808236-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/gema0011-698dd58655019f1c7916276163808730-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/gema0031-e197453d18f2cecc0516276163809086-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/gema0041-8431d82532ea4188c916276163809219-640-0.webp"
            ],
            "price": 49600,
            "slug": "arnes-body-gema",
            "type": "body",
            "tags": ["arnés", "body", "ajustable", "a medida", "una sola pieza"],
            "title": "ARNÉS BODY GEMA",
            "category": "arnes",
            "colors": ["negro", "blanco", "rojo", "azul", "verde", "rosa", "amarillo", "gris", "naranja", "violeta", "bordo", "fucsia", "beige", "celeste", "arcoiris", "animal print", "amarillo fluo", "naranja fluo"],
        },
        {
            "description": "Arnés body confeccionado a medida con elástico afelpado y piezas metálicas. No incluye choker ni ligas. Ajustable para un calce perfecto. Se requiere medida de contorno de bajobusto y cintura o datos de talla de ropa.",
            "images": [
                "https://acdn.mitiendanube.com/stores/001/477/757/products/olivia31-61bf3fd5d4feeba45916176798224820-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/olivia1-5fffe1dd154c85029b16176798223548-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/20220611_115005-7354d252dc78061e4c16549917273002-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/olivia21-3337932c6be7a4982a16176798224760-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/olivia041-c14ce3184d0e93764316176798225204-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/olivia061-dcb4755e15bdc97f0416176798226009-640-0.webp"
            ],
            "price": 39700,
            "slug": "arnes-body-olivia",
            "type": "body",
            "tags": ["arnés", "body", "ajustable", "a medida"],
            "title": "ARNÉS BODY OLIVIA",
            "category": "arnes",
            "colors": ["negro", "blanco", "rojo", "azul", "verde", "rosa", "amarillo", "gris", "naranja", "violeta", "bordo", "fucsia", "beige", "celeste", "arcoiris", "animal print", "amarillo fluo", "naranja fluo"]
        },













        {
            "description": "Conjunto de arnés superior, collar y correa corta, hecho con cinta de polipropileno de 30 mm en color negro y detalles en color a elección. Ajustable en todos sus lados para un calce perfecto. Se requiere medida de contorno de bajobusto o datos de talla de ropa.",
            "images": [
                "https://acdn.mitiendanube.com/stores/001/477/757/products/pet071-e7e11f46dfbb3ba2bd16176498132105-240-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/pet061-626c49b3f9520e397516176488417776-240-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/pet091-b271203cbf6e18e95d16176488417712-240-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/pet011-54523d7c49ad0dbe5216176488416692-240-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/petsolo1-0cac75832310da1e2b16176660930397-240-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/pet031-d6dea5eaedf25a5e8016176494610908-240-0.webp"
            ],  
            "price": 42000,
            "slug": "conjunto-pet",
            "type": "conjunto",
            "tags": ["arnés", "conjunto", "collar", "correa corta", "ajustable", "a medida"],
            "title": "CONJUNTO PET",
            "category": "arnes",
            "colors": ["negro", "blanco", "rojo", "azul", "verde", "rosa", "amarillo", "gris", "naranja", "violeta", "bordo", "fucsia", "beige", "celeste", "arcoiris", "animal print", "amarillo fluo", "naranja fluo"],
        },












        {
            "description": "Tirador con detalle metálico en la espalda, confeccionado a medida con elástico afelpado y piezas metálicas. Ajustable para un calce perfecto. Se requiere medida de largo de espalda o datos de altura.",
            "images": [
                "https://acdn.mitiendanube.com/stores/001/477/757/products/ringo041-d30628e1a64e88b5e216176812751472-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/ringo0101-fefbaaa8707e1e1e3716176821873799-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/ringo031-ea9b131aea5e46b8cf16176812763366-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/ringo091-7c089178db1b73fb0516176821873947-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/ringo071-e99633da2a82af899d16176812779141-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/ringo081-47528b0d3685e9a9cb16176812779457-640-0.webp"
            ],
            "price": 28000,
            "slug": "tirador-ringo",
            "type": "tirador",
            "tags": ["tirador", "ajustable", "a medida", "detalle metálico"],
            "title": "TIRADOR RINGO",
            "category": "tirador",
            "colors": ["negro", "blanco", "rojo", "azul", "verde", "rosa", "amarillo", "gris", "naranja", "violeta", "bordo", "fucsia", "beige", "celeste", "arcoiris", "animal print", "amarillo fluo", "naranja fluo"]
        },











        {
            "description": "Choker con correa corta, confeccionado en cinta de polipropileno de 30mm con base negra o bordó y detalles en color a elección, acompañado de piezas metálicas. Ajustable para un calce perfecto. Puedes comprar el set arnés + choker + correa en la categoría 'Conjuntos'.",
            "images": [
                "https://acdn.mitiendanube.com/stores/001/477/757/products/20221014_150812-42a613585993e61c1416657733541254-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/20221014_150922-ca26186be0e33a202616657733541482-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/20221014_150934-58b0a9c76394022ce116657733541481-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/chokerpet051-4baa77def0f5c3dd0016177435029356-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/chokerpet041-5727afb4218b66b15316177435029498-640-0.webp"
            ],
            "price": 12500,
            "slug": "choker-pet-correa",
            "type": "chookers",
            "tags": ["choker", "regulable", "correa", "a medida", "negro", "bordó"],
            "title": "CHOKER PET + CORREA",
            "category": "chokers",
            "colors": ["negro", "bordo"]
        },











        {
            "description": "Arnés de una pierna confeccionado a medida con cinta de polipropileno de 30mm color negro, con detalles en color a elección y piezas metálicas. Ajustable para un calce perfecto. Se requiere medida de contorno de pierna (donde sea más grande el muslo) o datos de talla de pantalón o jean.",
            "images": [
                "arnes_1_pierna_alone_1.jpg",
                "arnes_1_pierna_alone_2.jpg"
            ],
            "price": 20500,
            "slug": "arnes-1-pierna-alone",
            "type": "ligas",
            "tags": ["arnés", "inferior", "una pierna", "ajustable", "a medida", "negro"],
            "title": "ARNÉS 1 PIERNA ALONE",
            "category": "ligas",
            "colors": ["negro", "blanco", "rojo", "azul", "verde", "rosa", "amarillo", "gris", "naranja", "violeta", "bordo", "fucsia", "beige", "celeste", "arcoiris", "animal print", "amarillo fluo", "naranja fluo"]
        },
        
        
        
        






        {
            "description": "Set de 2 esposas con mosquetón y 1 conector, ideal para conectar con arneses, lencería y correas. Confeccionado con cinta de polipropileno color negro con detalles en color a elección, piezas metálicas y hebillas plásticas. Ajustable para un calce perfecto.",
            "images": [
                "https://acdn.mitiendanube.com/stores/001/477/757/products/esposas0511-2ea840568af9191daf16177624117982-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/esposasola1-b7d39167f13830622a16177624116587-640-0.webp",
                "https://acdn.mitiendanube.com/stores/001/477/757/products/esposas0211-c0eee4cbd3c7b5fcd616177624117520-640-0.webp"
            ],
            "price": 26500,
            "slug": "2-esposas-1-conector",
            "type": "extras",
            "tags": ["esposas", "conector", "ajustable", "a medida", "negro"],
            "title": "2 ESOSAS + 1 CONECTOR",
            "category": "extras",
            "colors": ["negro"]
        }
        
    ]
}