import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Categories } from './Categories.entity';
import { OrderDetails } from './OrderDetails.entity';

@Entity({
  name: 'products',
})
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'integer' })
  stock: number;

  @Column({
    type: 'varchar',
    nullable: false,
    default: './ecommerce-mpedro-j/public/noDisponible.webp',
  })
  imgUrl: string;

  @OneToMany(() => Categories, (category) => category.product)
  category: Categories[];

  @ManyToMany(() => OrderDetails, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetails[];
}
