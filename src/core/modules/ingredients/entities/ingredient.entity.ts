
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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
