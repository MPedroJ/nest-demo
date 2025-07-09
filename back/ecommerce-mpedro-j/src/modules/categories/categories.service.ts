import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/Categories.entity';
import { Repository } from 'typeorm';
import { CategoriesRepository } from './categories.repositoy';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,

    private readonly categoriesFileRepository: CategoriesRepository,
  ) {}

  getCategoriesService(): Promise<Categories[]> {
    return this.categoriesFileRepository.getCategoriesRepository();
  }

  addCategoryService(newCategoryData): Promise<Categories> {
    return this.categoriesFileRepository.addCategoriesRepository(
      newCategoryData,
    );
  }
}
