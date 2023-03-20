import { RmqService } from '@app/rmq';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRequestOrder } from './dto/create-request-oreder.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService, private readonly rmqService: RmqService) {}

  @Post()
  createOrder(@Body() request: CreateRequestOrder) {
    return this.ordersService.createOrder(request);
  }
  @Get()
  getOrder() {
    this.rmqService.getOptions('aa');
    return this.ordersService.getOrders();
  }
}
