import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthenticatedGuard } from "../auth/guard";
import { ProductDto } from "./dto";
import { ProductService } from "./product.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { GetUser } from "../auth/decorator";

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post("create")
  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(FilesInterceptor('file'))
  createProduct(@UploadedFiles() files: Array<Express.Multer.File>, @Body() dto: ProductDto){
    return this.productService.createProduct(dto)
  }
  @Get('get')
  getProducts(){
    return this.productService.getAllProducts()
  }

}
