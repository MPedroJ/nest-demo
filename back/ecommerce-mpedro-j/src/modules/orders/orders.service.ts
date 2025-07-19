import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDTO } from 'src/DTO/OrdersDTOs/newOrder.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  getOrdersService(id: string) {
    return this.ordersRepository.getOrdersRepository(id);
  }

  addOrderService(orderData: CreateOrderDTO) {
    return this.ordersRepository.addOrderRepository(orderData);
  }
}
