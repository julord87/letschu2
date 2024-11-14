"use server";

import prisma from "@/lib/prisma";



export const getTypes = async () => {
    try {

        const types = await prisma.type.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        return types;
        
    } catch (error) {
        console.log(error);
        return [];        
    }
}