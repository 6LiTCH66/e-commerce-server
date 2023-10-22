import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AddCategoryDto } from "./dto";

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(dto: AddCategoryDto){

    const candidate = await this.prisma.category.findFirst({
      where: {
        name: dto.name,
      }
    })

    if (candidate){
      throw new ForbiddenException("Category taken")
    }

    return this.prisma.category.create({
      data: {
        ...dto
      }
    })
  }

  async findAllCategories(){
    return this.prisma.category.findMany()
  }
}
