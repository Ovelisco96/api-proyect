import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Orders } from './../entity/order.entity';
import { Users } from './../../users/entity/user.entity';
import { CreateOrderDto, UpdateOrderDto } from './../dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private orderRepo: Repository<Orders>,
    @InjectRepository(Users) private UsersRepo: Repository<Users>,
  ) { }

  findAll() {
    return this.orderRepo.find({
      relations: ['items', 'items.product', 'user'],
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'items.product', 'user'],
    });
    if (!order) {
      throw new NotFoundException('not found');
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Orders();
    if (data.userId) {
      const customer = await this.UsersRepo.findOne({
        where: { id: data.userId }
      });
      order.user = customer;
    }
    return this.orderRepo.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({
      where: { id }
    });
    if (changes.userId) {
      const customer = await this.UsersRepo.findOne({
        where: { id: changes.userId }
      });
      order.user = customer;
    }
    return this.orderRepo.save(order);
  }

  remove(id: number) {
    return this.orderRepo.delete(id);
  }
}