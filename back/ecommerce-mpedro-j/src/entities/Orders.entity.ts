import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Users } from './Users.entity';
import { OrderDetails } from './OrderDetails.entity';

@Entity({
  name: 'orders',
})
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @ManyToOne(() => Users, (user) => user.orders_id)
  user: Users[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order_id)
  orderDetails: OrderDetails;
}
