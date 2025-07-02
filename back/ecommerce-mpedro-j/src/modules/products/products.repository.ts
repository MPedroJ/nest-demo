import { Injectable } from '@nestjs/common';
import { Products } from 'src/interface/Products';

@Injectable()
export class ProductsRepository {
  private products: Products[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description of product 1',
      price: 10,
      image: 'https://picsum.photos/200/300',
      stock: 100,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description of product 2',
      price: 20,
      image: 'https://picsum.photos/200/300',
      stock: 50,
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description of product 3',
      price: 30,
      image: 'https://picsum.photos/200/300',
      stock: 75,
    },
  ];

  findAll() {
    return this.products;
  }
}
