import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { AddItemDto, EditItemDto } from "./dto";
import { AuthenticatedGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";
import { CartItemsService } from "./cart-items.service";

@UseGuards(AuthenticatedGuard)
@Controller('cart-items')
export class CartItemsController {
  constructor(private cartItemsService: CartItemsService) {
  }
  @Post('add')
  addItemToCart(@Body() dto: AddItemDto, @GetUser('id') userId: number){
    return this.cartItemsService.addItemToCart(dto, userId)
  }

  // add custom guard that checks if current user own this cart item
  @Delete('delete/:id')
  deleteItemFormCart(@Param('id', ParseIntPipe) cartItemId: number){
    return this.cartItemsService.deleteItemFromCart(cartItemId)
  }

  // add custom guard that checks if current user own this cart item
  @Patch('edit/:id')
  editItemInCart(@Body() dto: EditItemDto, @Param('id', ParseIntPipe) cartItemId: number){
    return this.cartItemsService.editCartItem(dto, cartItemId)

  }
}
