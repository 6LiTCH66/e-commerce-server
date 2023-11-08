import { isProductExists } from "../../review/validators";
import { IsInt, IsNotEmpty, IsPositive } from "class-validator";
import { Type } from "class-transformer";

export class AddItemDto{

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @isProductExists()
  // isProductExists have to be in shared validators
  productId: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  // create a validator that checks if quantity is not over the limit
  quantity: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  // create a validator that checks if productVariantsId belong to productId
  productVariantsId: number

}