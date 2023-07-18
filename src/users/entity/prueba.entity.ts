/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Orders } from './order.entity';
@Entity()
export class Pruebas {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phone: number;

  @Column()
  role: string;

}