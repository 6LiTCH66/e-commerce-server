import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from "@nestjs/config";
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'path';
import { ReviewModule } from './review/review.module';
import { CommonModule } from './common/common.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule,
    PrismaModule,
    UserModule,
    ProductModule,
    CategoryModule,
    CartModule,
    CartItemsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    ReviewModule,
    CommonModule,
    OrderModule,
  ],
})
export class AppModule {}
