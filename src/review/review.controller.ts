import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDto, EditReviewDto } from "./dto";
import { AuthenticatedGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";
import { ReviewOwnershipGuardGuard } from "./guard";
@UseGuards(AuthenticatedGuard)
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post('create')
  createReview(@Body() dto: CreateReviewDto, @GetUser('id') userId: number){
    return this.reviewService.createReview(dto, userId)
  }

  @Patch('edit/:id')
  @UseGuards(ReviewOwnershipGuardGuard)
  editReview(@Body() dto: EditReviewDto, @Param("id", ParseIntPipe) reviewId: number) {
    return this.reviewService.editReview(dto, reviewId)
  }

  @Delete('delete/:id')
  @UseGuards(ReviewOwnershipGuardGuard)
  deleteReview(@Param('id', ParseIntPipe) reviewId: number) {
    return this.reviewService.deleteReview(reviewId)
  }
}
