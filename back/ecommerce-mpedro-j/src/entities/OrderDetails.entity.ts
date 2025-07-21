import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './Orders.entity';
import { OrderDetailsProduct } from './OrderDetailsProduct.entity';

@Entity({
  name: 'orderDetails',
})
export class OrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToOne(() => Orders, (order) => order.orderDetails, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  @OneToMany(() => OrderDetailsProduct, (odp) => odp.orderDetail, {
    cascade: true,
  })
  orderDetailsProducts: OrderDetailsProduct[];

  @Column({ type: 'int' })
  totalQuantity: number;
}
