import { Module } from '@nestjs/common';
import { ProductExistsValidator } from "./validators";
import { ProductModule } from "../product/product.module";

@Module({
  providers: [ProductExistsValidator],
  exports: [ProductExistsValidator],
  imports: [ProductModule]
})
export class CommonModule {}
