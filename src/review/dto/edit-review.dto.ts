import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";
import { Type } from "class-transformer";

export class EditReviewDto{

  @IsNotEmpty()
  @Min(1)
  @Max(5)
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  rating?: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  comment?: string
}