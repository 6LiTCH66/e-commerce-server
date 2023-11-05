import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Gender } from "./product.dto";
import { Size } from "./productVariants.dto";

enum SortedBy{
  desc = 'desc',
  asc = 'asc'
}

export class QueryDto{
  @IsInt()
  @Type(() => Number)

  @IsOptional()
  readonly categoryId: number;

  @IsEnum(Gender)
  @IsOptional()
  readonly gender: Gender;

  @IsString()
  @IsOptional()
  readonly color: string

  @IsEnum(Size)
  @IsOptional()
  readonly size: Size


  @IsInt()
  @Type(() => Number)
  @IsOptional()
  readonly min: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  readonly max: number;

  @IsEnum(SortedBy)
  @IsOptional()
  readonly sortedBy: SortedBy


}