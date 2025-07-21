import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetails } from './OrderDetails.entity';
import { Products } from './Products.entity';

@Entity('orderDetails_products')
export class OrderDetailsProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => OrderDetails,
    (orderDetail) => orderDetail.orderDetailsProducts,
  )
  @JoinColumn({ name: 'orderDetails_id' })
  orderDetail: OrderDetails;

  @ManyToOne(() => Products, (product) => product.orderDetailsProducts)
  @JoinColumn({ name: 'product_id' })
  product: Products;

  @Column()
  quantity: number;
}
