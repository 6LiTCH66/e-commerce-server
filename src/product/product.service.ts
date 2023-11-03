import { BadRequestException, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { ProductDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService, private config: ConfigService) {}

  async createProduct(dto: ProductDto){

    dto.productVariants.forEach((productVariants) => {
      productVariants.colorImages = productVariants.colorImages.map((image) => `${this.config.get("BASED_URL")}/uploads/${image}`)
    })

    const {productVariants, ...product} = dto

    const createdProduct = await this.prismaService.product.create({
      data: {
        ...product,
        productVariants: {
          create: productVariants
        }
      },
      include: {
        productVariants: true
      }
    })

    if (!createdProduct){
      throw new BadRequestException('Unable to create a new product', { cause: new Error(), description: 'Something went wrong while creating a new product!' })

    }

    return createdProduct


  }

  async getAllProducts(){
    return this.prismaService.product.findMany()
  }

  async getProductDetails(productId: number){

    const product = await this.prismaService.product.findUnique({
      where: {
        id: productId
      },
      include: {
        productVariants: true,
        reviews: true
      }
    })

    if (!product){
      throw new NotFoundException(`Product with id ${productId} is not found!`)
    }

    return product
  }

  async getProductByFilter(){

  }


}
