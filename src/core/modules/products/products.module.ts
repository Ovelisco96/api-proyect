import { Module } from '@nestjs/common';

import { ProductService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/products.controller';
import { Products } from './entity/product.entity';
import { Ingredients } from '../ingredients/entities/ingredient.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Products, Ingredients])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})

export class ProductModule { }