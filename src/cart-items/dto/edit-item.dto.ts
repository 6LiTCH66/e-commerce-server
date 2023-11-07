import { IsNotEmpty, IsPositive } from "class-validator";

export class EditItemDto{

  @IsNotEmpty()
  @IsPositive()
  // create a validator that checks if quantity is not over the limit
  quantity: number;
}