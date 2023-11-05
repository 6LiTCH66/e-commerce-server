import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';
import axios from "axios"

const prisma = new PrismaClient();
const UNSPLASH_ACCESS_KEY = 'nexttimebuddy';
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

async function fetchFashionImages(count = 1) {
  try {
    const response = await axios.get(`https://api.unsplash.com/photos/random`, {
      params: {
        client_id: UNSPLASH_ACCESS_KEY,
        count: count,
        query: 'Clothe',
      },
    });
    return response.data.map((photo) => photo.urls.regular);
  } catch (error) {
    console.error('Error fetching images from Unsplash:', error);
    return [];
  }
}

async function main() {

  const categoriesIds = [1, 2, 3, 4, 5];
  const colors = ['000000', 'FFFFFF', 'FF0000', '00FF00', '0000FF'];


  for (const categoryId of categoriesIds) {
    const imageUrls = await fetchFashionImages(3);
    const randomNumber =  faker.number.int({ min: 2, max: 4 })

    for (let i = 0; i < 10; i++) {
      const product = await prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: faker.number.int({ min: 10, max: 100 }),
          categoryId,
          gender: faker.helpers.enumValue(Gender)
        },
      });

      for (let j = 0; j < randomNumber; j++){
        await prisma.productVariants.create({
          data: {
            size: faker.helpers.enumValue(Size),
            stockQuantity: faker.number.int({min: 0, max: 100}),
            color: faker.helpers.arrayElement(colors),
            productId: product.id,
            colorImages: imageUrls
          }
        })
      }
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
