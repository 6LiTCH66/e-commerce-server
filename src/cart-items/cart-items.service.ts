import { Injectable } from '@nestjs/common';
import { CartService } from "../cart/cart.service";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CartItemsService {
  constructor(private prismaService: PrismaService, private cartService: CartService) {}
}
