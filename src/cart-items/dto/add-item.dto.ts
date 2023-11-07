import { isProductExists } from "../../review/validators";
import { IsInt, IsNotEmpty } from "class-validator";
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
  // create a validator that checks if quantity is not over the limit
  quantity: number;

}