-- CreateEnum
CREATE TYPE "ShippingCompany" AS ENUM ('correo_argentino', 'fedex', 'dhl', 'oca', 'andreani', 'ups');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "shippingCompanies" "ShippingCompany"[] DEFAULT ARRAY[]::"ShippingCompany"[];
