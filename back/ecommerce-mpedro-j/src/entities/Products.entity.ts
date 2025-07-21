import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Categories } from './Categories.entity';
import { OrderDetailsProduct } from './OrderDetailsProduct.entity';

@Entity({
  name: 'products',
})
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'integer', nullable: false })
  stock: number;

  @Column({
    type: 'varchar',
    nullable: false,
    default: './ecommerce-mpedro-j/public/noDisponible.webp',
  })
  imgUrl: string | undefined;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @OneToMany(() => OrderDetailsProduct, (odp) => odp.product)
  orderDetailsProducts: OrderDetailsProduct[];
}
