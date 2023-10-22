/*
  Warnings:

  - Added the required column `size` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "size" "Size" NOT NULL;
