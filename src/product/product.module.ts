import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MulterModule } from "@nestjs/platform-express";
import * as multer from 'multer';
import * as path from "path";

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    MulterModule.register({
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const filename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
          cb(null, filename);

          if (!req.body.images) {
            req.body.images = [];
          }
          req.body.images.push(filename);


        },
      }),
    }),
  ]
})
export class ProductModule {}
