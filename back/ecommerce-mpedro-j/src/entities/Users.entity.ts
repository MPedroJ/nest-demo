import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Orders } from './Orders.entity';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  password: string;

  @Column('integer')
  phone: number;

  @Column({ type: 'varchar', length: 50 })
  country: string;

  @Column('varchar')
  address: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @OneToMany(() => Orders, (buyOrders) => buyOrders.user)
  orders_id: Orders[];
}
