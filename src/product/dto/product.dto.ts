import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested
} from "class-validator";
import { Type } from "class-transformer";
import { SizeDto } from "./size.dto";

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

  @IsNotEmpty()
  images: string[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SizeDto)
  sizes: SizeDto[]

}