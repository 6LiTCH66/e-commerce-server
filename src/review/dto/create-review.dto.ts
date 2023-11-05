import { IsInt, IsNotEmpty, IsNumber, IsString, Max, Min, Validate } from "class-validator";
import { Type } from "class-transformer";
import { isProductExists, ProductExistsValidator } from "../validators";

export class CreateReviewDto{

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @isProductExists()
  productId: number;

  @IsNotEmpty()
  @Min(1)
  @Max(5)
  @IsInt()
  @Type(() => Number)
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string

}