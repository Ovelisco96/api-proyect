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
  import { Products } from '../entity/product.entity';
import { ApiTags } from '@nestjs/swagger';
  @ApiTags('Product')
  @Controller('product')
  export class ProductController {
    constructor(private readonly productService: ProductService) {}
  
    @Get()
    getProducts() /* : Promise<User[]> */ {
      return this.productService.findAll();
    }
  
    @Post()
    createProduct(@Body() product: ProductDto): Promise<Products> {
      return this.productService.createProduct(product);
    }
  
    @Patch(':id')
    async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() changes: ProductDto) {
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