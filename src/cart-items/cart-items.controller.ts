import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { AddItemDto, EditItemDto } from "./dto";
import { AuthenticatedGuard } from "../auth/guard";

@UseGuards(AuthenticatedGuard)
@Controller('cart-items')
export class CartItemsController {
  // create guard that checks if cart for current user is created, if not create a new one
  @Post('add')
  addItemToCart(@Body() dto: AddItemDto){
    console.log(dto);
  }

  @Delete('delete/:id')
  deleteItemFormCart(@Param('id', ParseIntPipe) cartItemId: number){

  }

  @Patch('edit/:id')
  editItemInCart(@Body() dto: EditItemDto, @Param('id', ParseIntPipe) cartItemId: number){

  }
}
