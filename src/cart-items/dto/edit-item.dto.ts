import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class EditItemDto{

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  quantity: number;


}