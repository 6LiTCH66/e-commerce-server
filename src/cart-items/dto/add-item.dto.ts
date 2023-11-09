import { IsInt, IsNotEmpty, IsPositive, Validate } from "class-validator";
import { Type } from "class-transformer";
import { isQuantityOverLimit } from "../validator";
import { isProductVariantBelongToProduct } from "../validator";
import { isProductExists } from "../../common/validators";

export class AddItemDto{

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @isProductExists()
  // isProductExists have to be in shared validator
  productId: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @isProductVariantBelongToProduct()
  productVariantsId: number

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @isQuantityOverLimit()
  quantity: number;



}