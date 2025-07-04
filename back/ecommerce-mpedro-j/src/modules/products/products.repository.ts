import { Injectable } from '@nestjs/common';
import { INewProductDTO, IProductResponseDTO } from 'src/DTO/productDTO';
import { IProduct } from 'src/interface/Product';

@Injectable()
export class ProductsRepository {
  private products: IProduct[] = [
    {
      id: 1,
      name: 'Auriculares Inalámbricos',
      description:
        'Auriculares Bluetooth con cancelación de ruido y batería de larga duración.',
      price: 19999,
      image: 'https://example.com/images/auriculares.jpg',
      stock: 30,
    },
    {
      id: 2,
      name: 'Teclado Mecánico RGB',
      description:
        'Teclado con switches azules, anti-ghosting y retroiluminación RGB.',
      price: 25999,
      image: 'https://example.com/images/teclado.jpg',
      stock: 15,
    },
    {
      id: 3,
      name: 'Monitor 24 pulgadas',
      description: 'Monitor Full HD con panel IPS, tiempo de respuesta de 5ms.',
      price: 57999,
      image: 'https://example.com/images/monitor.jpg',
      stock: 10,
    },
    {
      id: 4,
      name: 'Mouse Gamer',
      description:
        'Mouse óptico con DPI ajustable, 6 botones programables y luces LED.',
      price: 8499,
      image: 'https://example.com/images/mouse.jpg',
      stock: 40,
    },
    {
      id: 5,
      name: 'Silla Ergonómica',
      description:
        'Silla de oficina con soporte lumbar ajustable y asiento acolchado.',
      price: 89999,
      image: 'https://example.com/images/silla.jpg',
      stock: 8,
    },
    {
      id: 6,
      name: 'Webcam HD',
      description:
        'Cámara web 1080p con micrófono incorporado, ideal para videollamadas.',
      price: 15999,
      image: 'https://example.com/images/webcam.jpg',
      stock: 25,
    },
    {
      id: 7,
      name: 'Notebook 14"',
      description: 'Notebook con Intel i5, 8GB de RAM y SSD de 256GB.',
      price: 229999,
      image: 'https://example.com/images/notebook.jpg',
      stock: 5,
    },
    {
      id: 8,
      name: 'Smartwatch Deportivo',
      description: 'Reloj inteligente con medición de ritmo cardíaco y GPS.',
      price: 34999,
      image: 'https://example.com/images/smartwatch.jpg',
      stock: 18,
    },
    {
      id: 9,
      name: 'Parlante Bluetooth',
      description:
        'Parlante portátil con sonido estéreo y resistencia al agua.',
      price: 17999,
      image: 'https://example.com/images/parlante.jpg',
      stock: 22,
    },
    {
      id: 10,
      name: 'Tablet 10"',
      description: 'Tablet con pantalla HD, 4GB RAM y 64GB de almacenamiento.',
      price: 109999,
      image: 'https://example.com/images/tablet.jpg',
      stock: 12,
    },
  ];

  findAll(): IProduct[] {
    return this.products;
  }

  findById(id: number): IProductResponseDTO {
    const product: IProductResponseDTO | undefined = this.products.find(
      (user) => user.id === id,
    );

    if (!product) throw new Error('Product not found');

    return product;
  }

  createProductRepository(newProductInfo: INewProductDTO): IProductResponseDTO {
    const id: number = this.products.length + 1;

    const product: IProduct = {
      id: id,
      name: newProductInfo.name,
      description: newProductInfo.description,
      price: newProductInfo.price,
      image: newProductInfo.image,
      stock: newProductInfo.stock,
    };
    this.products.push(product);
    return product;
  }

  updateProductRepository(id: number): IProduct {
    console.log(id);
    const product = this.products.find((user) => user.id === id);
    if (!product) {
      throw new Error('User not found');
    }
    product.name = 'Lechuga Cosmica';
    return product;
  }

  deleteProductRepository(id: number): number {
    const newProductArray = this.products.filter((user) => user.id !== id);
    this.products = newProductArray;
    console.log(this.products);
    return id;
  }
}
