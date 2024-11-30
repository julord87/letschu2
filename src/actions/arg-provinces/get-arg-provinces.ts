"use server";

import prisma from "@/lib/prisma";

export const getArgProvinces = async () => {
  try {
    const provinces = await prisma.provinceArg.findMany({
      orderBy: { name: "asc" },
    });
    return provinces;
  } catch (error) {
    console.error("Error fetching provinces:", error);
    return [];
  }
};
