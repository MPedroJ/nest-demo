import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/Categories.entity';
import { Repository } from 'typeorm';
import { CategoriesRepository } from './categories.repositoy';
import { NewCategoryDTO } from 'src/DTO/CategoriesDTOs/newCategory.dto';
import { NewCategoryResponseDTO } from 'src/DTO/CategoriesDTOs/newCategoryResponse.dto';
import { UpdateCategoryDTO } from 'src/DTO/CategoriesDTOs/updateCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,

    private readonly categoriesFileRepository: CategoriesRepository,
  ) {}

  async updateCategoryService(id: string, req: UpdateCategoryDTO) {
    await this.categoriesRepository.update(id, req);

    const updatedCategory = await this.categoriesRepository.findOne({
      where: {
        id: id,
      },
    });

    return updatedCategory;
  }
  getCategoriesService(): Promise<Categories[]> {
    return this.categoriesFileRepository.getCategoriesRepository();
  }

  addCategoryService(
    newCategoryData: NewCategoryDTO,
  ): Promise<NewCategoryResponseDTO> {
    return this.categoriesFileRepository.addCategoriesRepository(
      newCategoryData,
    );
  }
}
