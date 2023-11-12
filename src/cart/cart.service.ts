import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService) {}

  async isCartExistWithProductVariant(userId: number, cartItemId?: number){
    return this.prismaService.cart.findFirst({
      where: {
        userId: userId,
        items: {
          some: {
            id: cartItemId
          }
        }

      }
    })
  }
  async isCartExist(userId: number){
    return this.prismaService.cart.findFirst({
      where: {
        userId: userId,

      }
    })
  }


  async createCart(userId: number){
    return this.prismaService.cart.create({
      data:{
        userId: userId
      }
    })
  }


  async deleteAllCartItems(cartId: number){
    return this.prismaService.cartItems.deleteMany({
      where: {
        cardId: cartId
      }
    })
  }
  async getUserCartId(userId: number){
    return this.prismaService.cart.findFirst({
      where:{
        userId: userId
      },
      select: {
        id: true
      }
    })
  }


  async getUserCartItems(userId: number){
    const userCart = await this.getUserCart(userId)

    return this.prismaService.cartItems.findMany({
      where: {
        cardId: userCart.id
      },
      include: {
        product: {
          select: {
            price: true
          }
        }
      }
    })
  }

  async getUserCart(userId: number){
    return this.prismaService.cart.findFirst({
      where: {
        userId: userId
      },
      include: {
        items: {
          include: {
            product: true,
            productVariants: true
          }
        }
      }
    })
  }
}
