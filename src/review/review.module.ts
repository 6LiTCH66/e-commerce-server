import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ProductModule } from "../product/product.module";
import { ProductExistsValidator } from "./validators";


@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ProductExistsValidator],
  imports: [ProductModule]
})
export class ReviewModule {}
