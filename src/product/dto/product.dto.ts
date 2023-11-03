import {
  IsArray, IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested
} from "class-validator";
import { Type } from "class-transformer";
import { ProductVariantsDto } from "./productVariants.dto";

export enum Gender{
  Male = "Male",
  Female = "Female",
  Unisex = "Unisex"
}

export class ProductDto{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  price: number;


  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  categoryId: number;

  // @IsNotEmpty()
  // images: string[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductVariantsDto)
  productVariants: ProductVariantsDto[]

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender

}