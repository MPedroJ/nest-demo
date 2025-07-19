import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from 'src/entities/Products.entity';
import { PaginatedProductsDTO } from 'src/DTO/ProductsDTOs/paginatedProducts.dto';
import { NewProductDTO } from 'src/DTO/ProductsDTOs/newProduct.dto';
import { ProductIdDTO } from 'src/DTO/ProductsDTOs/productId.dto';
import { UpdateProductDTO } from 'src/DTO/ProductsDTOs/updateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(private productsFileRepository: ProductsRepository) {}

  async getProductsService(
    pageNumber: number,
    limitNumber: number,
  ): Promise<PaginatedProductsDTO> {
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

  createProductService(newUserInfo: NewProductDTO): Promise<Products> {
    return this.productsFileRepository.createProductRepository(newUserInfo);
  }

  updateProductService(
    id: string,
    newInfoProduct: UpdateProductDTO,
  ): Promise<Products | null> {
    return this.productsFileRepository.updateProductRepository(
      id,
      newInfoProduct,
    );
  }

  deleteProductService(id: string): Promise<ProductIdDTO> {
    return this.productsFileRepository.deleteProductRepository(id);
  }
}
