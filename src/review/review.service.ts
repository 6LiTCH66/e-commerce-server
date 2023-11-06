import { BadRequestException, Injectable, NotFoundException, UsePipes } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateReviewDto, EditReviewDto } from "./dto";
import { ProductService } from "../product/product.service";

@Injectable()
export class ReviewService {
  constructor(private prismaService: PrismaService, private productService: ProductService) {}

  async getReviewById(reviewId: number) {
    return this.prismaService.review.findUnique({
      where: {
        id: reviewId
      }
    })
  }

  async createReview(dto: CreateReviewDto, userId: number){

    await this.prismaService.review.create({
      data: {
        ...dto,
        userId: userId
      }
    })

    return {
      message: "A new review was successfully added!"
    }
  }

  async editReview(dto: EditReviewDto, reviewId: number){
    console.log(dto);

  }

  async deleteReview(productId: number){

  }
}
