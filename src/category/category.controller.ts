import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { AddCategoryDto } from "./dto";
import { AuthenticatedGuard } from "../auth/guard";

@UseGuards(AuthenticatedGuard)
@Controller('category')
export class CategoryController {

  constructor(private categoryService: CategoryService) {}

  @Post('create')
  createCategory(@Body() dto: AddCategoryDto){
    return this.categoryService.createCategory(dto)
  }
  @Get('all')
  getAllCategories(){
    return this.categoryService.findAllCategories()
  }
}
