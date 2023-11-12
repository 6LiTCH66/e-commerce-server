import { Injectable } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { CartService } from "../cart/cart.service";

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService, private cartService: CartService) {}

  async createOrder(userId: number){
    const usersCart = await this.cartService.getUserCartItems(userId)
    const userCartId = await this.cartService.getUserCartId(userId)

    const orderDetails =
      usersCart.map(({id, cardId, product, productVariantsId, ...rest}) => {
        return { ...rest, price: product.price, productVariantId: productVariantsId  }
      })

    const totalPrice = orderDetails.reduce((acc, item) => {
      return acc + (item.price * item.quantity)
    }, 0)


    const order = await this.prismaService.order.create({
      data: {
        userId: userId,
        totalPrice: totalPrice,

        orderDetails: {
          create: orderDetails.map(detail => ({
            productId: detail.productId,
            productVariantId: detail.productVariantId,
            quantity: detail.quantity,
            price: detail.price,
          }))
        }
      }
    })

    await this.cartService.deleteAllCartItems(userCartId.id)

    return order

  }

  async getUserOrders(userId: number){
    return this.prismaService.order.findMany({
      where: {
        userId: userId
      },
      include: {
        orderDetails: {
          include: {
            product: true,
            productVariant: true
          }
        }
      }
    })
  }

  async getOrderDetails(orderId: number){
    return this.prismaService.order.findUnique({
      where: {
        id: orderId
      },
      include: {
        orderDetails: {
          select:{
            product: true,
            productVariant: true
          }
        }
      }
    })

  }
}
