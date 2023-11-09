import { IsNotEmpty, IsPositive } from "class-validator";
import { isQuantityOverLimit } from "../validator";

export class EditItemDto{

  @IsNotEmpty()
  @IsPositive()
  @isQuantityOverLimit()
  quantity: number;
}