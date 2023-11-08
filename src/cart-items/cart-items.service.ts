import { ForbiddenException, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { CartService } from "../cart/cart.service";
import { PrismaService } from "../prisma/prisma.service";
import { AddItemDto, EditItemDto } from "./dto";
import { ProductService } from "../product/product.service";

@Injectable()
export class CartItemsService {
  constructor(private prismaService: PrismaService, private cartService: CartService, private productService: ProductService) {}

  async findDuplicate(productVariantId: number){
    return this.prismaService.cartItems.findFirst({
      where: {
        productVariantsId: productVariantId
      }
    })
  }

  async addItemToCart(dto: AddItemDto, userId: number){
    const isUserCartExist = await this.cartService.isCartExist(userId)

    const findProductQuantity = await this.productService.getProductWithProductVariant(dto.productId, dto.productVariantsId)


    if (!findProductQuantity){
      throw new NotFoundException(`ProductVariant with ID ${dto.productVariantsId} not found for product with ID ${dto.productId}.`)
    }

    if (findProductQuantity.stockQuantity < dto.quantity){
      throw new NotAcceptableException("Quantity cannot be greater than stock quantity of product!")
    }


    if (!isUserCartExist){

      const createdCart = await this.cartService.createCart(userId)

      return this.prismaService.cartItems.create({
        data:{
          ...dto,
          cardId: createdCart.id
        }
      })
    }

    const findItemDuplicate = await this.findDuplicate(dto.productVariantsId)

    if(findItemDuplicate && (findItemDuplicate.quantity + dto.quantity) < findProductQuantity.stockQuantity){
      return this.prismaService.cartItems.update({
        where:{
          id: findItemDuplicate.id
        },
        data: {
          quantity: findItemDuplicate.quantity + dto.quantity
        }
      })
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
        id: cartItemId
      }
    })
  }

  async editCartItem(dto: EditItemDto, cartItemId: number){
    // const

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
