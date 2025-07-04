import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import {
  INewProductDTO,
  IPaginatedProducts,
  IProductResponseDTO,
} from 'src/DTO/productDTO';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}
  getProductsService(
    pageNumber: number,
    limitNumber: number,
  ): IPaginatedProducts {
    const productsArray: IProductResponseDTO[] =
      this.productsRepository.findAll();

    const start = (pageNumber - 1) * limitNumber;
    const end = start + limitNumber;
    const filteredUsers = productsArray.slice(start, end);

    const totalPages = Math.ceil(productsArray.length / limitNumber);

    return {
      data: filteredUsers,
      total: productsArray.length,
      page: pageNumber,
      limit: limitNumber,
      totalPages: totalPages,
    };
  }

  getProductByIdService(id: number): IProductResponseDTO {
    return this.productsRepository.findById(Number(id));
  }

  createProductService(newUserInfo: INewProductDTO): IProductResponseDTO {
    return this.productsRepository.createProductRepository(newUserInfo);
  }

  updateProductService(id: number) {
    return this.productsRepository.updateProductRepository(id);
  }

  deleteProductService(id: number): number {
    return this.productsRepository.deleteProductRepository(id);
  }
}
