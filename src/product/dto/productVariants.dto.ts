import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export enum Size {
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

export class ProductVariantsDto {
  @IsNotEmpty()
  @IsEnum(Size)
  size: Size

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  stockQuantity: number;

  @IsNotEmpty()
  @IsString()
  color: string

  @IsNotEmpty()
  colorImages: string[];
}