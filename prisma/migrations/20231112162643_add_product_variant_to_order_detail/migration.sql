/*
  Warnings:

  - Added the required column `productVariantId` to the `OrderDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderDetail" ADD COLUMN     "productVariantId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderDetail" ADD CONSTRAINT "OrderDetail_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
