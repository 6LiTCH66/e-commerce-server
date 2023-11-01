import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { ProductDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService, private config: ConfigService) {}

  async createProduct(dto: ProductDto){

    dto.images = dto.images.map((image) => `${this.config.get("BASED_URL")}/uploads/${image}`)
    const {sizes, ...product} = dto

    const createdProduct = await this.prismaService.product.create({
      data: {
        ...product,
        sizes:{
          create: sizes
        }
      },
      include: {
        sizes: true
      }
    })

    if (!createdProduct){
      throw new BadRequestException('Unable to create a new product', { cause: new Error(), description: 'Something went wrong when creating a new product!' })

    }

    return createdProduct

  }

  async getAllProducts(){
    return this.prismaService.product.findMany()
  }

  async getProductByFilter(){}


}