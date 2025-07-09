import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Categories } from 'src/entities/Categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repositoy';

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  providers: [CategoriesService, CategoriesRepository],
  controllers: [CategoriesController],
  exports: [CategoriesRepository, CategoriesService],
})
export class CategoriesModule {}
