import {
  Body,
  Controller,
  Get,
  Param, ParseIntPipe,
  Post, Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { AuthenticatedGuard } from "../auth/guard";
import { ProductDto, QueryDto } from "./dto";
import { ProductService } from "./product.service";
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { GetUser } from "../auth/decorator";

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post("create")
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(AnyFilesInterceptor())
  createProduct(@UploadedFiles() files: { [fieldname: string]: Express.Multer.File[] }, @Body() dto: ProductDto){
    return this.productService.createProduct(dto)
  }
  // @Get('get')
  // getProducts(){
  //   return this.productService.getAllProducts()
  // }

  @Get('details/:id')
  getProductDetails(@Param('id', ParseIntPipe) productId: number){
    return this.productService.getProductDetails(productId)

  }

  @Get('get')
  getProducts(@Query() params: QueryDto){
    return this.productService.getProducts(params)
  }


}
