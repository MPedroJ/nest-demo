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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUserId } from 'src/decorators/getUserId.decorator';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'This gets you an order by his Id (User must be logged in)',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getOrdersController(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrdersService(id);
  }

  @Post()
  @ApiOperation({
    summary: 'This is to add a new order (User must be logged in)',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  addOrderController(
    @Body() request: CreateOrderDTO,
    @GetUserId() user: { sub: string; email: string },
  ) {
    return this.ordersService.addOrderService(request, user.sub);
  }
}
