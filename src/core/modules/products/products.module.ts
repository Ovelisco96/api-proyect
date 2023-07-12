import { Module } from '@nestjs/common';

import { ProductService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './controllers/products.controller';
import { Products } from './entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})

export class ProductModule {}