"use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
  categoryName?: string; // 'string' correcto
  typeName?: string; // 'string' correcto
}

// Paginar todos los productos sin filtrar por categoría
export const getAllPaginatedProductsWithImages = async ({
  page = 1,
  take = 1,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });

    const totalCount = await prisma.product.count();
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("No se pudo cargar los productos");
  }
};

// Paginación por categoría
export const getAllPaginatedProductsWithImagesByCategory = async ({
  page = 1,
  take = 1,
  categoryName,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;
  console.log("Category:", categoryName);


  try {
    // 1. Buscar la categoría por el nombre
    const categoryFilter = await prisma.category.findUnique({
      where: {
        name: categoryName,
      },
    });

    // Si la categoría no existe, retornar sin productos
    if (!categoryFilter) {
      return {
        currentPage: page,
        totalPages: 0,
        products: [],
      };
    }

    // 2. Obtener los productos filtrados por categoría
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      where: {
        categoryId: categoryFilter.id,
      },
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });

    // 3. Contar los productos filtrados por categoría
    const totalCount = await prisma.product.count({
      where: {
        categoryId: categoryFilter.id,
      },
    });

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url), // Solo asigna el URL de la imagen
      })),
    };

  } catch (error) {
    console.error("Error detallado:", error);
    throw new Error("No se pudo cargar los productos");
  }
};

// Función para paginar productos por tipo
export const getAllPaginatedProductsWithImagesByType = async ({
  page = 1,
  take = 1,
  typeName,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;
  console.log("Type:", typeName);

  try {
    // 1. Buscar el tipo por el nombre
    const typeFilter = await prisma.type.findUnique({
      where: {
        name: typeName,
      },
    });

    // Si el tipo no existe, retornar sin productos
    if (!typeFilter) {
      return {
        currentPage: page,
        totalPages: 0,
        products: [],
      };
    }

    // 2. Obtener los productos filtrados por tipo
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      where: {
        typeId: typeFilter.id,
      },
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });

    // 3. Contar los productos filtrados por tipo
    const totalCount = await prisma.product.count({
      where: {
        typeId: typeFilter.id,
      },
    });

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };

  } catch (error) {
    console.error("Error detallado:", error);
    throw new Error("No se pudo cargar los productos");
  }
};