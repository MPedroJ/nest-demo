import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { CreateOrderDTO } from 'src/DTO/OrdersDTOs/newOrder.dto';
import { OrderIdDTO } from 'src/DTO/OrdersDTOs/orderId.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  getOrdersService(id: OrderIdDTO) {
    return this.ordersRepository.getOrdersRepository(id);
  }

  addOrderService(orderData: CreateOrderDTO) {
    return this.ordersRepository.addOrderRepository(orderData);
  }
}
