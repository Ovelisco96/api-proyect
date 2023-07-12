import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
  } from '@nestjs/common';
  import { ProductService } from '../services/products.service';
  import { ProductDto } from '../dto/product.dto';
  import { Product } from '../product.entity';
  @Controller('product')
  export class ProductController {
    constructor(private readonly productService: ProductService) {}
  
    @Get()
    getProducts() /* : Promise<User[]> */ {
      return this.productService.findAll();
    }
  
    @Post()
    createProduct(@Body() user: ProductDto): Promise<Product> {
      return this.productService.createProduct(user);
    }
  
    @Patch(':id')
    async updateProduct(@Param('id') id: number, @Body() changes: ProductDto) {
      console.log('BY ID', id);
      return this.productService.update(id, changes);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      console.log(
        '🚀 ~ file: users.controller.ts:36 ~ UsersController ~ remove ~ id:',
        id,
      );
  
      return this.productService.remove(id);
    }
  }