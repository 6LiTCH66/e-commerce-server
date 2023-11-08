import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { CartModule } from "../cart/cart.module";
import { ProductModule } from "../product/product.module";

@Module({
  providers: [CartItemsService],
  controllers: [CartItemsController],
  imports: [CartModule, ProductModule]

})
export class CartItemsModule {}
