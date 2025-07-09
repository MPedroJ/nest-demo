import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  // @Post('seeder')
  // preloadingCategoriesController() {
  //   return this.categoriesService.onModuleInit();
  // }

  @Get()
  getCategoriesController() {
    return this.categoriesService.getCategoriesService();
  }

  @Post()
  addCategoryController(@Body() request) {
    return this.categoriesService.addCategoryService(request);
  }
}
