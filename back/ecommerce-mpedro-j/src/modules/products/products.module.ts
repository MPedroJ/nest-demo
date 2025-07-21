import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/Products.entity';
import { Categories } from 'src/entities/Categories.entity';
import { Users } from 'src/entities/Users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products, Users]),
    TypeOrmModule.forFeature([Categories]),
  ],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController],
  exports: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
