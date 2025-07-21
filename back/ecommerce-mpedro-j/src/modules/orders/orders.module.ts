import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { Orders } from 'src/entities/Orders.entity';
import { OrderDetails } from 'src/entities/OrderDetails.entity';
import { Products } from 'src/entities/Products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users.entity';
import { OrderDetailsProduct } from 'src/entities/OrderDetailsProduct.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderDetails,
      Products,
      Orders,
      Users,
      OrderDetailsProduct,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
