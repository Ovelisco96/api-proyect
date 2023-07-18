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
  fecha_entrega: Date;

  @ManyToMany(() => Ingredients, (ingredients) => ingredients.product)
  @JoinTable({
    name: 'product_ingredients', //nombre de la tabla que tambien puede ser products_has_categories
    joinColumn: {
      name: 'product_id', // Relación con la entidad donde estas situado.
    },
    inverseJoinColumn: {
      name: 'ingredients_id', // Relación con la otra entidad.
    },
  })
  ingredients: Ingredients[];


}
