-- CreateTable
CREATE TABLE "PeoductImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "PeoductImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PeoductImage" ADD CONSTRAINT "PeoductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
