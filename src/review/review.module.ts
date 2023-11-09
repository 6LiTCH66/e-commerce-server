import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { CommonModule } from "../common/common.module";


@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [CommonModule]
})
export class ReviewModule {}
