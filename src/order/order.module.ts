import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartModule } from "../cart/cart.module";
import { CartItemsModule } from "../cart-items/cart-items.module";

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [CartModule, CartItemsModule]
})
export class OrderModule {}
