import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from '../services/products.service';
import { FilterProductDto, ProductDto } from '../dto/product.dto';
import { Products } from '../entity/product.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(@Query() params: FilterProductDto): Promise<Products[]> {
    return this.productService.findAll(params);
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number): Promise<Products> {
    return this.productService.findOneById(id);
  }

  @Post()
  createProduct(@Body() product: ProductDto): Promise<Products> {
    return this.productService.createProduct(product);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: ProductDto,
  ): Promise<Products> {
    return this.productService.update(id, changes);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }

  @Patch(':id/ingredient/:ingredientId')
  addCategoryToProduct(
    @Param('id') id: number,
    @Param('ingredientId') ingredientId: number,
  ) {
    return this.productService.addIngredientToProduct(id, ingredientId);
  }

  @Delete(':id/ingredient/:ingredientId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('ingredientId', ParseIntPipe) ingredientId: number,
  ) {
    return this.productService.removeIngredientByProduct(id, ingredientId);
  }
}
