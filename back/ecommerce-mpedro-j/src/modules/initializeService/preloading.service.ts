import { Injectable, OnModuleInit } from '@nestjs/common';
import * as data from '../products/products&categories.json';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/Categories.entity';
import { Products } from 'src/entities/Products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PreloadingService implements OnModuleInit {
  constructor(
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,

    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async onModuleInit() {
    const preloadingCategoriesService = async () => {
      const categoriesNames = new Set(data.map((item) => item.category));

      const categoriesArray = Array.from(categoriesNames);

      const categories = categoriesArray.map((category) => ({
        name: category,
      }));

      await this.categoriesRepository.upsert(categories, ['name']);

      const transformCategories = await this.categoriesRepository.find();

      const exsitingProducts = await this.productsRepository.find();

      if (exsitingProducts.length > 0) {
        return 'Products already Preloaded';
      }

      const products = data.map((product) => {
        const category = transformCategories.find(
          (category) => category.name === product.category,
        );

        const newProducts = new Products();
        newProducts.name = product.name;
        newProducts.description = product.description;
        newProducts.price = product.price;
        newProducts.stock = product.stock;
        newProducts.imgUrl = product.imgUrl;
        newProducts.category = category!;

        return newProducts;
      });

      await this.productsRepository.upsert(products, ['name']);

      return 'Categories and Products preloading completed';
    };
    await preloadingCategoriesService();
  }
}
