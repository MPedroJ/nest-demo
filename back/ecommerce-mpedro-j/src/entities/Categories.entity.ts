import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Products } from './Products.entity';

@Entity({
  name: 'categories',
})
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @ManyToOne(() => Products, (product) => product.category)
  product: Products | null;
}
