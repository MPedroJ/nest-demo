import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewProductDTO } from 'src/DTO/ProductsDTOs/newProduct.dto';
import { ProductIdDTO } from 'src/DTO/ProductsDTOs/productId.dto';
import { UpdateProductDTO } from 'src/DTO/ProductsDTOs/updateProduct.dto';
import { Categories } from 'src/entities/Categories.entity';
import { Products } from 'src/entities/Products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Categories)
    private readonly categoriesRepository: Repository<Categories>,
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
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async createProductRepository(
    newProductInfo: NewProductDTO,
  ): Promise<Products> {
    const categoryEntity = await this.categoriesRepository.findOne({
      where: {
        id: newProductInfo.category,
      },
    });

    if (!categoryEntity)
      throw new NotFoundException(
        `Couldn't find the category to  create the product`,
      );

    const newProduct = this.productsRepository.create({
      ...newProductInfo,
      category: categoryEntity,
    });
    await this.productsRepository.save(newProduct);

    return newProduct;
  }

  async updateProductRepository(
    id: string,
    newInfoProduct: UpdateProductDTO,
  ): Promise<Products | null> {
    await this.productsRepository.update(id, newInfoProduct);

    const user = this.productsRepository.findOne({
      where: {
        id: id,
      },
    });

    return user;
  }

  async deleteProductRepository(id: string): Promise<ProductIdDTO> {
    await this.productsRepository.delete(id);

    return { id };
  }
}
