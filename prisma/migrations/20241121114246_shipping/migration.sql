-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shippingCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "shippingMethod" TEXT NOT NULL DEFAULT 'showroom';
