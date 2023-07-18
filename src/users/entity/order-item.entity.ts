import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Products } from '../../products/entity/product.entity';
import { Orders } from './order.entity';

@Entity()
export class OrderItems {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Products)
  @JoinColumn({ name: 'product_id' })
  product: Products;

  @ManyToOne(() => Orders, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  order: Orders;
}