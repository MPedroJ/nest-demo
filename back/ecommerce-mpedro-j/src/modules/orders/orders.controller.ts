import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateOrderDTO } from 'src/DTO/OrdersDTOs/newOrder.dto';
import { OrderIdDTO } from 'src/DTO/OrdersDTOs/orderId.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  @UseGuards(AuthGuard)
  getOrdersController(@Param('id', ParseUUIDPipe) id: OrderIdDTO) {
    return this.ordersService.getOrdersService(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  addOrderController(@Body() request: CreateOrderDTO) {
    return this.ordersService.addOrderService(request);
  }
}
