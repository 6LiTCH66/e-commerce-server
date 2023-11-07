import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { CartModule } from "../cart/cart.module";

@Module({
  providers: [CartItemsService],
  controllers: [CartItemsController],
  imports: [CartModule]

})
export class CartItemsModule {}
