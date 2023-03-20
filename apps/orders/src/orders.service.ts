import { Injectable } from '@nestjs/common';
import { CreateRequestOrder } from './dto/create-request-oreder.dto';
import { OrdersRepository } from './orders.repository';
import { Order } from './schema/orders.schema';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrdersRepository) {}

  createOrder(request: CreateRequestOrder){
    return this.orderRepository.create(request);
  }
  getOrders() {
    return this.orderRepository.find();
  }
}
