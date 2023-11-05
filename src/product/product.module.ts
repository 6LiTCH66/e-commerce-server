import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MulterModule } from "@nestjs/platform-express";
import * as multer from 'multer';
import * as path from "path";
import { Request } from "express";
import { ProductVariantsDto } from "./dto";
import { APP_PIPE } from "@nestjs/core";

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
  imports: [
    MulterModule.register({
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req: Request, file, cb) => {

          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const filename = file.originalname + '-' + uniqueSuffix + path.extname(file.originalname);
          cb(null, filename);

          req.body.productVariants.map((productVariants: ProductVariantsDto) => {
            if (!productVariants.colorImages){
              productVariants.colorImages = []
            }

            productVariants.colorImages.push(filename)
          })
        },
      }),
    }),
  ]
})
export class ProductModule {}
