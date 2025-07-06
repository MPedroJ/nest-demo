import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Orders } from './Orders.entity';
import { Products } from './Products.entity';

@Entity({
  name: 'orderDetails',
})
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => Orders, (order) => order.orderDetails)
  order_id: Orders;

  @ManyToMany(() => Products, (product) => product.orderDetails)
  product: Products[];
}
