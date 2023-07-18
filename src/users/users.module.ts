import { Module } from '@nestjs/common';

import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entity/user.entity';
import { UsersController } from './controllers/users.controller';
import { Orders } from './entity/order.entity';
import { OrderItems } from './entity/order-item.entity';
import { ProductModule } from '../products/products.module';
import { OrdersService } from './services/orders.services';
import { OrdersController } from 'src/users/controllers/orders.controller';
import { OrderItemController } from './controllers/order-items.controllers';
import { OrderItemService } from './services/order-item.services';
import { Pruebas } from './entity/prueba.entity';

@Module({
  imports: [ProductModule, TypeOrmModule.forFeature([Users, Orders, OrderItems, Pruebas])],
  providers: [UsersService, OrdersService, OrderItemService],
  controllers: [UsersController, OrdersController, OrderItemController],
  exports: [UsersService],
})

export class UsersModule { }
