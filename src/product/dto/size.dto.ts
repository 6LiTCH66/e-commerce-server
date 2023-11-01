import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

enum Size {
  XXS = 'XXS',
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
  XXXL = 'XXXL',
  XXXXL = 'XXXXL',
}

export class SizeDto{
  @IsNotEmpty()
  @IsEnum(Size)
  size: Size

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  stockQuantity: number;
}