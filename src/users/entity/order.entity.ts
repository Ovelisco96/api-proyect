import { Users } from './user.entity';
import { Products } from './../../products/entity/product.entity';
import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  Entity,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { OrderItems } from './order-item.entity';
import { Expose } from 'class-transformer';
@Entity()
export class Orders {

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

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToMany(() => OrderItems, (item) => item.order)
  items: OrderItems[];

  @Expose()
  get total() {
    // tenemos items?
    if (this.items) {
      // hacemos esta transformación

      return this.items
        .filter((items) => !!items) // nos aseguramos que no sea nulo o oundefined
        .reduce((acum, item) => {
          // el precio total es igual a el precio por la cantidad
          const totalItem = item.product.price * item.quantity;
          // se lo sumamos al acum en cada iteración
          return acum + totalItem;
        }, 0);
    }

    return 0;
  }
}
