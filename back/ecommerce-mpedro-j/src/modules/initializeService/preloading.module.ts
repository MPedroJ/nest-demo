import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';
import { PreloadingService } from './preloading.service';
import { PreloadingController } from './preloading.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/entities/Categories.entity';
import { Products } from 'src/entities/Products.entity';

@Module({
  imports: [
    ProductsModule,
    CategoriesModule,
    TypeOrmModule.forFeature([Categories]),
    TypeOrmModule.forFeature([Products]),
  ],
  providers: [PreloadingService],
  controllers: [PreloadingController],
})
export class PreloadingModule {}
