import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Ingredients } from '../../ingredients/entities/ingredient.entity';
@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ type: 'date' })
  fechaEntrega: Date;

  @ManyToMany(() => Ingredients, (ingredients) => ingredients.product)
  @JoinTable()
  ingredients: Ingredients[];


}
