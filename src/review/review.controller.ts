import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes } from "@nestjs/common";
import { ReviewService } from "./review.service";
import { CreateReviewDto, EditReviewDto } from "./dto";
import { AuthenticatedGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";
import { NotEmptyParamPipe } from "./pipes";
@UseGuards(AuthenticatedGuard)
@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post('create')
  createReview(@Body() dto: CreateReviewDto, @GetUser('id') userId: number){
    return this.reviewService.createReview(dto, userId)
  }

  @Patch('edit/:id')
  @UsePipes(new NotEmptyParamPipe())
  editReview(@Body() dto: EditReviewDto, @Param("id", ParseIntPipe) productId: number) {
    return this.reviewService.editReview(dto, productId)
  }

  @Delete('delete/:id')
  @UsePipes(new NotEmptyParamPipe())
  deleteReview(@Param('id', ParseIntPipe) productId: number) {
    return this.reviewService.deleteReview(productId)
  }
}
