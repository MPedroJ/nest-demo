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
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getOrdersController(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrdersService(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  addOrderController(@Body() request: CreateOrderDTO) {
    return this.ordersService.addOrderService(request);
  }
}
