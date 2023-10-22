import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class AddCategoryDto{
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string;
}