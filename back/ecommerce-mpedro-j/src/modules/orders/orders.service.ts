import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { IOrderDTO } from 'src/DTO/orderDTO';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  getOrdersService(id: string) {
    return this.ordersRepository.getOrdersRepository(id);
  }

  addOrderService(orderData: IOrderDTO) {
    return this.ordersRepository.addOrderRepository(orderData);
  }
}
