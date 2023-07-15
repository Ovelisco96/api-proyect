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

<<<<<<< HEAD
  @Column({type: 'date'})
  date: Date;
  
=======
  @Column({ type: 'date' })
  fechaEntrega: Date;

>>>>>>> 3d34fccfd7f2a3f719a2fe615846a7ae19acf8c6
  @ManyToMany(() => Ingredients, (ingredients) => ingredients.product)
  @JoinTable()
  ingredients: Ingredients[];


}
