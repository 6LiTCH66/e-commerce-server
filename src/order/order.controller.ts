import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";

import { AuthenticatedGuard } from "../auth/guard";
import { GetUser } from "../auth/decorator";
import { OrderService } from "./order.service";

@UseGuards(AuthenticatedGuard)
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('create')
  createOrder(@GetUser('id') userId: number){
    return this.orderService.createOrder(userId)
  }

  @Get('all')
  getUserOrders(@GetUser('id') userId: number){
    return this.orderService.getUserOrders(userId)
  }

  @Get(':id')
  getOrderDetails(@Param('id', ParseIntPipe) orderId: number){
    return this.orderService.getOrderDetails(orderId)
  }
}
