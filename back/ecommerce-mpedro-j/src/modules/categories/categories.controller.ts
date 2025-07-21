import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { NewCategoryDTO } from 'src/DTO/CategoriesDTOs/newCategory.dto';
import { Categories } from 'src/entities/Categories.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/roles.enum';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'This gets you all the categories' })
  getCategoriesController(): Promise<Categories[]> {
    return this.categoriesService.getCategoriesService();
  }

  @Post()
  @ApiOperation({ summary: `This let's you create a category (Admin only)` })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  addCategoryController(@Body() request: NewCategoryDTO): Promise<Categories> {
    return this.categoriesService.addCategoryService(request);
  }
}
