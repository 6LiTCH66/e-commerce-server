import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService) {}

  async createCart(userId: number){
    return this.prismaService.cart.create({
      data:{
        userId: userId
      }
    })
  }

  async getUserCart(userId: number){
    return this.prismaService.cart.findMany({
      where: {
        userId: userId
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })
  }
}
