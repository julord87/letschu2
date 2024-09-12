import { initialData } from "./seed";
import prisma from "../lib/prisma";


async function main() {
    await Promise.all([
        await prisma.productImage.deleteMany(),
        await prisma.product.deleteMany(),
        await prisma.type.deleteMany()
    ])
    



    console.log('seed-database ejecutado');
}







(() => { 
    
    if(process.env.NODE_ENV === 'production') {
        return;
    }

    main();
})();