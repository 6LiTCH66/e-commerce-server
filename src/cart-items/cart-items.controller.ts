import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { AddItemDto, EditItemDto } from "./dto";
import { AuthenticatedGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";
import { CartItemsService } from "./cart-items.service";
import { CartItemOwnershipGuard } from "./guard";

@UseGuards(AuthenticatedGuard)
@Controller('cart-items')
export class CartItemsController {
  constructor(private cartItemsService: CartItemsService) {
  }
  @Post('add')
  addItemToCart(@Body() dto: AddItemDto, @GetUser('id') userId: number){
    return this.cartItemsService.addItemToCart(dto, userId)
  }

  @UseGuards(CartItemOwnershipGuard)
  @Delete('delete/:id')
  deleteItemFormCart(@Param('id', ParseIntPipe) cartItemId: number){
    return this.cartItemsService.deleteItemFromCart(cartItemId)
  }

  @UseGuards(CartItemOwnershipGuard)
  @Patch('edit/:id')
  editItemInCart(@Body() dto: EditItemDto, @Param('id', ParseIntPipe) cartItemId: number){
    return this.cartItemsService.editCartItem(dto, cartItemId)

  }
}
