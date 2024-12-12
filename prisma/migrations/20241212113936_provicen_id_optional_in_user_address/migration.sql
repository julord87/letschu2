-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_provinceId_fkey";

-- AlterTable
ALTER TABLE "UserAddress" ALTER COLUMN "provinceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "ProvinceArg"("id") ON DELETE SET NULL ON UPDATE CASCADE;
