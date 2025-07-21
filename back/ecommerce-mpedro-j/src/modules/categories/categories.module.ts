import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Categories } from 'src/entities/Categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repositoy';
import { UsersRepository } from '../users/users.repository';
import { Users } from 'src/entities/Users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categories, Users])],
  providers: [CategoriesService, CategoriesRepository, UsersRepository],
  controllers: [CategoriesController],
  exports: [CategoriesRepository, CategoriesService],
})
export class CategoriesModule {}
