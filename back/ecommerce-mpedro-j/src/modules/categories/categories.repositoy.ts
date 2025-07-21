import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { connectionSource } from 'src/config/typeorm';
import { NewCategoryResponseDTO } from 'src/DTO/CategoriesDTOs/newCategoryResponse.dto';
import { Categories } from 'src/entities/Categories.entity';

@Injectable()
export class CategoriesRepository {
  async getCategoriesRepository(): Promise<Categories[]> {
    const queryRunner = connectionSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const categories = await queryRunner.manager.find(Categories);
      if (!categories)
        throw new NotFoundException('No se encontraron categorías');

      await queryRunner.commitTransaction();
      return categories;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async addCategoriesRepository(
    newCategoryData,
  ): Promise<NewCategoryResponseDTO> {
    const queryRunner = connectionSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existingCategory = await queryRunner.manager.findOne(Categories, {
        where: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          name: newCategoryData.name,
        },
      });

      if (existingCategory)
        throw new BadRequestException('Category already on the database');

      const newCategory = queryRunner.manager.create(Categories, {
        ...newCategoryData,
        product: null,
      });
      await queryRunner.manager.save(newCategory);
      await queryRunner.commitTransaction();
      return { message: 'Category added succesfully', newCategory };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
