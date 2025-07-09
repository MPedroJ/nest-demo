import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { INewProductDTO } from 'src/DTO/productDTO';
import { Products } from 'src/entities/Products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async findAll(): Promise<Products[]> {
    const products = await this.productsRepository.find();

    return products;
  }

  async findById(id: string): Promise<Products> {
    const product: Products | null = await this.productsRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!product) throw new Error('Product not found');
    return product;
  }

  async createProductRepository(
    newProductInfo: INewProductDTO,
  ): Promise<Products> {
    const newProduct = this.productsRepository.create(newProductInfo);
    await this.productsRepository.save(newProduct);

    return newProduct;
  }

  async updateProductRepository(
    id: string,
    newInfoProduct: Partial<Products>,
  ): Promise<string> {
    await this.productsRepository.update(id, newInfoProduct);
    return id;
  }

  async deleteProductRepository(id: string): Promise<string> {
    await this.productsRepository.delete(id);

    return id;
  }
}
