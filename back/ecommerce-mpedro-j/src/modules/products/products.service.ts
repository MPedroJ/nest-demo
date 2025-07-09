import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import {
  INewProductDTO,
  IPaginatedProducts,
  IPreloadedProductsDTO,
} from 'src/DTO/productDTO';
import { Products } from 'src/entities/Products.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as data from '../products/products&categories.json';
import { Categories } from 'src/entities/Categories.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,

    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,

    private productsFileRepository: ProductsRepository,
  ) {}

  async preloadingProductsService() {
    const existingProducts: Products[] = await this.productsRepository.find();
    if (existingProducts.length) {
      throw new Error('Existen productos en la base de datos');
    }

    for (const product of data as IPreloadedProductsDTO[]) {
      const category: Categories | null =
        await this.categoriesRepository.findOne({
          where: {
            name: product.category,
          },
        });
      if (!category) {
        throw new Error('No se encontro la categoria');
      }

      const existingProduct = await this.productsRepository.findOne({
        where: {
          name: product.name,
        },
      });
      if (existingProduct) {
        throw new Error('Producto existente');
      }
      const newProduct = this.productsRepository.create({
        ...product,
        category: category,
      });
      await this.productsRepository.save(newProduct);
    }
    return 'Products preloading completed';
  }

  async getProductsService(
    pageNumber: number,
    limitNumber: number,
  ): Promise<IPaginatedProducts> {
    const productsArray = await this.productsFileRepository.findAll();
    const start = (pageNumber - 1) * limitNumber;
    const end = start + limitNumber;
    const filteredProducts = productsArray.slice(start, end);

    const totalPages = Math.ceil(productsArray.length / limitNumber);

    return {
      data: filteredProducts,
      total: productsArray.length,
      page: pageNumber,
      limit: limitNumber,
      totalPages: totalPages,
    };
  }

  getProductByIdService(id: string): Promise<Products> {
    return this.productsFileRepository.findById(id);
  }

  createProductService(newUserInfo: INewProductDTO): Promise<Products> {
    return this.productsFileRepository.createProductRepository(newUserInfo);
  }

  updateProductService(id: string, newInfoProduct: Partial<Products>) {
    return this.productsFileRepository.updateProductRepository(
      id,
      newInfoProduct,
    );
  }

  deleteProductService(id: string): Promise<string> {
    return this.productsFileRepository.deleteProductRepository(id);
  }
}
