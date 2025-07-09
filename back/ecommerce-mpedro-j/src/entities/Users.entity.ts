import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Orders } from './Orders.entity';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column('bigint')
  phone: number;

  @Column({ type: 'varchar', length: 50 })
  country: string;

  @Column('text')
  address: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'boolean', default: false, nullable: true })
  isAdmin: boolean;

  @OneToMany(() => Orders, (buyOrders) => buyOrders.user)
  @JoinColumn()
  orders: Orders[];
}
