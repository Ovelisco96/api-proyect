import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Orders } from './../entity/order.entity';
import { OrderItems } from './../entity/order-item.entity';
import { Products } from './../../products/entity/product.entity';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from './../dto/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Orders) private orderRepo: Repository<Orders>,
    @InjectRepository(OrderItems) private itemRepo: Repository<OrderItems>,
    @InjectRepository(Products) private productRepo: Repository<Products>,
  ) { }

  async create(data: CreateOrderItemDto) {
    const orderFound = await this.orderRepo.findOne({
      where: { id: data.orderId }
    });
    if (orderFound) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    const productFound = await this.productRepo.findOne({
      where: { id: data.productId }
    });
    if (productFound) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    const item = new OrderItems();
    item.order = orderFound;
    item.product = productFound;
    item.quantity = data.quantity;
    return this.itemRepo.save(item);
  }
}