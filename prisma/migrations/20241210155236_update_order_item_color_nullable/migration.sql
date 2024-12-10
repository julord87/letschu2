-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "courier" "ShippingCompany",
ALTER COLUMN "color" DROP NOT NULL;
