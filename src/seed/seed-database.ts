import { initialData } from "./seed";
import prisma from "../lib/prisma";
import { Color, ShippingCompany } from "@prisma/client";
import { countries } from "./seed-countries";
import { argProvinces } from "./seed-provincias-arg";

async function main() {
  // delete all prev database
  // await Promise.all([
  await prisma.orderAddress.deleteMany(),
    await prisma.orderItem.deleteMany(),
    await prisma.order.deleteMany(),
    await prisma.userAddress.deleteMany(),
    await prisma.user.deleteMany(),
    await prisma.country.deleteMany(),
    await prisma.provinceArg.deleteMany(),
    await prisma.productImage.deleteMany(),
    await prisma.product.deleteMany(),
    await prisma.type.deleteMany(),
    await prisma.category.deleteMany();
  // ]);

  const { products, categories, types, users } = initialData;

  // Users
  await prisma.user.createMany({
    data: users,
  });

  // Countries
  await prisma.country.createMany({
    data: countries,
  });

  // Arg Provinces
  await prisma.provinceArg.createMany({
    data: argProvinces,
  });

  // Categories
  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  // Types
  const typesData = types.map((type) => ({
    name: type,
  }));

  await prisma.type.createMany({
    data: typesData,
  });

  // Products
  const categoriesDB = await prisma.category.findMany();
  const typesDB = await prisma.type.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  const typesMap = typesDB.reduce((map, type) => {
    map[type.name.toLowerCase()] = type.id;
    return map;
  }, {} as Record<string, string>);

  products.forEach(async (product) => {
    const {
      images,
      type,
      category,
      title,
      description,
      slug,
      tags, // Asegúrate de extraer los tags del producto
      colors, // Extrae los colores del producto
      ...rest
    } = product as {
      images: string[];
      type: string;
      category: string;
      title: string;
      description: string;
      slug: string;
      tags: string[];
      colors: string[];
    };

    const data = {
      title,
      description,
      slug,
      categoryId: categoriesMap[category.toLowerCase()],
      typeId: typesMap[type.toLowerCase()],
      colors: colors.map((color) => color as Color), // Mapea los colores al enumerado `Color`
      tags, // Usa directamente los tags del producto
    };

    const dbProduct = await prisma.product.create({
      data,
    });

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log("seed-database ejecutado!");
}

(() => {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  main();
})();
