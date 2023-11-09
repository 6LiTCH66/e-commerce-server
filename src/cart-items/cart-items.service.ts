import { ForbiddenException, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { CartService } from "../cart/cart.service";
import { PrismaService } from "../prisma/prisma.service";
import { AddItemDto, EditItemDto } from "./dto";
import { ProductService } from "../product/product.service";

@Injectable()
export class CartItemsService {
  constructor(private prismaService: PrismaService, private cartService: CartService, private productService: ProductService) {}

  async findDuplicateInUserCart(productVariantId: number, userId: number){

    return this.prismaService.cart.findFirst({
      where: {
        items: {
          some: {
            productVariantsId: productVariantId
          }
        },
        userId: userId

      },
      select: {
        items: {
          where: {
            productVariantsId: productVariantId
          }
        }
      }
    })

  }

  async addItemToCart(dto: AddItemDto, userId: number){
    const isUserCartExist = await this.cartService.isCartExist(userId)

    const findProductQuantity = await this.productService.getProductWithProductVariant(dto.productId, dto.productVariantsId)


    if (!isUserCartExist){

      const createdCart = await this.cartService.createCart(userId)

      return this.prismaService.cartItems.create({
        data:{
          ...dto,
          cardId: createdCart.id
        }
      })
    }

    const findItemDuplicate = await this.findDuplicateInUserCart(dto.productVariantsId, userId)

    if(findItemDuplicate){

      const itemDuplicate = findItemDuplicate.items[0]

      if (((itemDuplicate.quantity + dto.quantity) < findProductQuantity.stockQuantity)){
        return this.prismaService.cartItems.update({
          where:{
            id: itemDuplicate.id,
          },
          data: {
            quantity: itemDuplicate.quantity + dto.quantity
          }
        })
      }
    }

    return this.prismaService.cartItems.create({
      data:{
        ...dto,
        cardId: isUserCartExist.id
      }
    })
  }

  async deleteItemFromCart(cartItemId: number){
    return this.prismaService.cartItems.delete({
      where: {
        id: cartItemId,
      }
    })
  }

  async editCartItem(dto: EditItemDto, cartItemId: number){

    const cartItem = await this.prismaService.cartItems.findFirst({
      where: {
        id: cartItemId
      },
      select: {
        productVariants: true
      }
    })

    if (dto.quantity > cartItem.productVariants.stockQuantity){
      throw new NotAcceptableException("Quantity cannot be greater than stock quantity of product!")
    }


    return this.prismaService.cartItems.update({
      where: {
        id: cartItemId
      },
      data: {
        ...dto
      }
    })
  }
}
