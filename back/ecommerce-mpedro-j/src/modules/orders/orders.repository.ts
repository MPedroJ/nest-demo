import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { connectionSource } from 'src/config/typeorm';
import { CreateOrderDTO } from 'src/DTO/OrdersDTOs/newOrder.dto';
import { OrderDetails } from 'src/entities/OrderDetails.entity';
import { OrderDetailsProduct } from 'src/entities/OrderDetailsProduct.entity';
import { Orders } from 'src/entities/Orders.entity';
import { Products } from 'src/entities/Products.entity';
import { Users } from 'src/entities/Users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetails)
    private readonly orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(OrderDetailsProduct)
    private readonly orderDetailsProductRepository: Repository<OrderDetailsProduct>,
  ) {}
  async getOrdersRepository(id: string) {
    const queryRunner = connectionSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order: Orders | null = await queryRunner.manager.findOne(Orders, {
        where: {
          id: id,
        },
        relations: {
          orderDetails: {
            orderDetailsProducts: {
              product: true,
            },
          },
        },
      });

      if (!order) throw new NotFoundException('Order not found');

      await queryRunner.commitTransaction();
      return order;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async addOrderRepository(orderData: CreateOrderDTO, userId: string) {
    const user: Users | null = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) throw new NotFoundException('User not found');

    const order = new Orders();
    order.user = user;
    order.date = new Date();

    const newOrder = await this.ordersRepository.save(order);

    let totalPrice = 0;

    const productsArray = await Promise.all(
      orderData.products.map(async (element) => {
        const product: Products | null = await this.productsRepository.findOne({
          where: {
            id: element.id,
          },
        });

        if (!product) throw new NotFoundException('Product not found');

        const quantity = element.quantity ?? 1;

        if (product.stock < quantity) {
          throw new BadRequestException(
            `Not enough stock for product: ${product.name}`,
          );
        }

        totalPrice += Number(product.price) * quantity;

        await this.productsRepository.update(product.id, {
          stock: product.stock - quantity,
        });
        return { product, quantity };
      }),
    );

    const orderDetails = new OrderDetails();
    orderDetails.order = newOrder;
    orderDetails.totalQuantity = productsArray.reduce(
      (sum, p) => sum + p.quantity,
      0,
    );
    orderDetails.price = Number(totalPrice.toFixed(2));

    const savedOrderDetails =
      await this.orderDetailsRepository.save(orderDetails);

    const orderDetailsProducts = productsArray.map((element) => {
      const ODPInstance = new OrderDetailsProduct();
      ODPInstance.orderDetail = savedOrderDetails;
      ODPInstance.product = element.product;
      ODPInstance.quantity = element.quantity;
      return ODPInstance;
    });

    await this.orderDetailsProductRepository.save(orderDetailsProducts);

    return await this.ordersRepository.findOne({
      where: {
        id: newOrder.id,
      },
      relations: {
        orderDetails: {
          orderDetailsProducts: {
            product: true,
          },
        },
      },
    });
  }
}
