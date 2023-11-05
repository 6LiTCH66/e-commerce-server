import { BadRequestException, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { ProductDto, QueryDto } from "./dto";
import { PrismaService } from "../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService, private config: ConfigService) {}

  async getOneProduct(productId: number){
    return this.prismaService.product.findUnique({
      where: {
        id: productId
      }
    })
  }

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

  async getProductDetails(productId: number){

    const product = await this.prismaService.product.findUnique({
      where: {
        id: productId
      },
      include: {
        productVariants: true,
        reviews: {
          include: {
            user: {
              select:{
                email: true,
                lastName: true,
                firstName: true,
              }
            }
          }
        },
        category: true,
      }
    })

    if (!product){
      throw new NotFoundException(`Product with id ${productId} is not found!`)
    }

    return product
  }

  async getProducts(filter: QueryDto){
    const {min, max, size, color,sortedBy, ...sortFilter} = filter

    return this.prismaService.product.findMany({
      where: {
        ...sortFilter,
        productVariants: {
          some:{
            size: size,
            color: color
          }
        },
        price: {
          gte: min,
          lte: max
        },
      },
      include: {
        productVariants: {
          where:{
            size: size,
            color: color
          }
        }
      },
      orderBy: {
        price: sortedBy
      }

    })
  }

}
