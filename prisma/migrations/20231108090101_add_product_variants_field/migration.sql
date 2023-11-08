/*
  Warnings:

  - Added the required column `productVariantsId` to the `CartItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItems" ADD COLUMN     "productVariantsId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CartItems" ADD CONSTRAINT "CartItems_productVariantsId_fkey" FOREIGN KEY ("productVariantsId") REFERENCES "ProductVariants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
