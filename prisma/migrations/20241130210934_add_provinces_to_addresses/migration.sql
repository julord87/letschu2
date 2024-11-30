/*
  Warnings:

  - Added the required column `provinceId` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderAddress" ADD COLUMN     "provinceId" TEXT;

-- AlterTable
ALTER TABLE "UserAddress" ADD COLUMN     "provinceId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ProvinceArg" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ProvinceArg_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "ProvinceArg"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderAddress" ADD CONSTRAINT "OrderAddress_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "ProvinceArg"("id") ON DELETE SET NULL ON UPDATE CASCADE;
