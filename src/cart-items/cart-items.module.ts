import { Module } from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { CartModule } from "../cart/cart.module";
import { ProductModule } from "../product/product.module";
import { ProductVariantOwnershipValidator, QuantityLimitValidator } from "./validator";

@Module({
  providers: [CartItemsService, QuantityLimitValidator, ProductVariantOwnershipValidator],
  controllers: [CartItemsController],
  imports: [CartModule, ProductModule]

})
export class CartItemsModule {}
