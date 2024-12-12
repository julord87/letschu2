"use server";

import type { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al guardar la dirección",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId },
    });

    const addresToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2 || "",
      city: address.city,
      countryId: address.country,
      firstName: address.firstName,
      lastName: address.lastName,
      zip: address.zip,
      phone: address.phone,
      provinceId: address.province || null, // Agregar provinceId
    };

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: { ...addresToSave },
      });
      return newAddress;
    }

    const updatedAddress = await prisma.userAddress.update({
      where: { userId },
      data: { ...addresToSave },
    });

    return updatedAddress;
  } catch (error) {
    console.log(error);
    throw new Error("Error al guardar la dirección");
  }
};
