import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Products } from '../../products/entity/product.entity';
@Entity()
export class Ingredients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  variants: string;

  @Column()
  price: number;
}
