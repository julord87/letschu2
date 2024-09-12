import { initialData } from "./seed";
import prisma from "../lib/prisma";


async function main() {
    // delete all prev database
    await Promise.all([
        await prisma.productImage.deleteMany(),
        await prisma.product.deleteMany(),
        await prisma.type.deleteMany()
    ]);

    const { products, categories, types } = initialData;

    // Categories
    const categoriesData = categories.map((category) => ({
        name: category
    }))

    await prisma.category.createMany({
        data: categoriesData
    })

    // Types
    const typesData = types.map((type) => ({
        name: type
    }))

    await prisma.type.createMany({
        data: typesData
    })

    // Products
    const productsData = products.map((product) => ({
        ...product,
        categoryId: product.category,
        typeId: product.type
    }))

    
    console.log('seed-database ejecutado!');
}







(() => { 
    
    if(process.env.NODE_ENV === 'production') {
        return;
    }

    main();
})();