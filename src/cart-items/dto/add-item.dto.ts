import { IsInt, IsNotEmpty, IsPositive, Validate } from "class-validator";
import { Type } from "class-transformer";
import { isQuantityNotOverLimit } from "../validator";
import { isProductVariantBelongToProduct } from "../validator";
import { isProductExists } from "../../common/validators";

export class AddItemDto{

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @isProductExists()
  productId: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @isProductVariantBelongToProduct()
  productVariantsId: number

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @isQuantityNotOverLimit()
  quantity: number;



}