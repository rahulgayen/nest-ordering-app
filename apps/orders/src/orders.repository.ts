import { AbstractRepository } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Order } from './schema/orders.schema';

@Injectable()
export class OrdersRepository extends AbstractRepository<Order> {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>, @InjectConnection() connection: Connection) {
    super(orderModel, connection);
  }
}
