import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { NewCategoryDTO } from 'src/DTO/CategoriesDTOs/newCategory.dto';
import { Categories } from 'src/entities/Categories.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategoriesController(): Promise<Categories[]> {
    return this.categoriesService.getCategoriesService();
  }

  @Post()
  addCategoryController(@Body() request: NewCategoryDTO): Promise<Categories> {
    return this.categoriesService.addCategoryService(request);
  }
}
