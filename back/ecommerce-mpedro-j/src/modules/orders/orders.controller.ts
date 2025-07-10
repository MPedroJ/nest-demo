import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { IOrderDTO } from 'src/DTO/orderDTO';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  getOrdersController(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrdersService(id);
  }

  @Post()
  addOrderController(@Body() request: IOrderDTO) {
    return this.ordersService.addOrderService(request);
  }
}
