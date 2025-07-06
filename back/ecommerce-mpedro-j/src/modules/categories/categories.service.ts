import { Injectable, OnModuleInit } from '@nestjs/common';
import { connectionSource } from 'src/config/typeorm';
import { Categories } from 'src/entities/Categories.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CategoriesService implements OnModuleInit {
  async onModuleInit() {
    await this.preloadingCategoriesService();
  }
  private categories: Categories[] = [
    {
      id: uuid(),
      name: 'smartphone',
      product: null, // This will be set when assigning products
    },
    {
      id: uuid(),
      name: 'monitor',
      product: null,
    },
    {
      id: uuid(),
      name: 'keyboard',
      product: null,
    },
    {
      id: uuid(),
      name: 'mouse',
      product: null,
    },
  ];

  async preloadingCategoriesService() {
    const queryRunner = connectionSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const categories = await queryRunner.manager.find(Categories);
    if (categories.length) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
    }

    try {
      for (const category of this.categories) {
        const newCategory = queryRunner.manager.create(Categories, category);
        await queryRunner.manager.save(newCategory);
      }
      await queryRunner.commitTransaction();
      return 'Categories preloading completed';
    } catch (error) {
      console.error({
        message: 'Hubo un error en la precarga de datos',
        error,
      });
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
