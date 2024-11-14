"use server";

import prisma from '@/lib/prisma';
import { Color, Product } from '@prisma/client';
import { z } from 'zod';

const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(5).max(255),
    description: z.string().min(5).max(1000),
    price: z.coerce
        .number()
        .min(0)
        .transform((val) => Number(val.toFixed(2))),
    colors: z.coerce
        .string()
        .transform((val) => val.split(',')),
    tags: z.string(),
    categoryId: z.string().uuid(),
    typeId: z.string().uuid()
});

export const createUpdateProduct = async ( formData: FormData) => {

    const data = Object.fromEntries(formData);
    const productParsed = productSchema.safeParse(data);

    if( !productParsed.success ) {
        console.log(productParsed.error);
        return {
            ok: false
        }
    }

    const product = productParsed.data;
    product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim();

    const { id, ...rest} = product;

    const prismaTx = await prisma.$transaction( async (tx) => {

        let product: Product;
        const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase());

        if( id ) {
            product = await prisma.product.update({
                where: {
                    id
                },
                data: {
                    ...rest,
                    colors: {
                        set: rest.colors as Color[]
                    },
                    tags: {
                        set: tagsArray
                    }
                }
            });

            console.log({updatedProduct: product});
        } else {

        }

        // TODO: revalidate paths

        return {
            ok: true
        }
    })


}