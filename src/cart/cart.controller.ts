import { Controller, Get, ParseIntPipe, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";
import { AuthenticatedGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";

@UseGuards(AuthenticatedGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('get')
  getUserCart(@GetUser('id', ParseIntPipe) userId: number){
    return this.cartService.getUserCart(userId)
  }
}
