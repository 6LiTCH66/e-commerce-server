import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateReviewDto, EditReviewDto } from "./dto";

@Injectable()
export class ReviewService {
  constructor(private prismaService: PrismaService) {}

  async getReviewById(reviewId: number) {
    return this.prismaService.review.findUnique({
      where: {
        id: reviewId
      }
    })
  }

  async createReview(dto: CreateReviewDto, userId: number){

    return this.prismaService.review.create({
      data: {
        ...dto,
        userId: userId
      }
    })

  }

  async editReview(dto: EditReviewDto, reviewId: number){
    return this.prismaService.review.update({
      where:{
        id: reviewId
      },
      data: {
        ...dto
      }
    })

  }

  async deleteReview(reviewId: number){
    return this.prismaService.review.delete({
      where: {
        id: reviewId
      }
    })
  }
}
