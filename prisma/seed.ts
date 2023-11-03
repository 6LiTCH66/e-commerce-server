import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';
// import { Gender, Size } from "../src/product/dto"

const prisma = new PrismaClient();
enum Gender{
  Male = "Male",
  Female = "Female",
  Unisex = "Unisex"
}

enum Size {
  XXS = 'XXS',
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
  XXXL = 'XXXL',
  XXXXL = 'XXXXL',
}

async function main() {

  const categoriesIds = [1, 2, 3, 4, 5];

  for (const categoryId of categoriesIds) {
    for (let i = 0; i < 10; i++) { // Creating 10 products per category
      const product = await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.number.int({ min: 10, max: 100 }),
          categoryId,
          gender: faker.helpers.enumValue(Gender),
          productVariants: {
            create: {
              size: faker.helpers.enumValue(Size),
              stockQuantity: faker.number.int({min: 0, max: 100}),
              color: faker.internet.color().slice(1), // Removing '#' for your color format
              colorImages: new Array(3).fill(null).map(() => faker.image.urlLoremFlickr({ category: 'fashion' }))
            }
          }
        },
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
