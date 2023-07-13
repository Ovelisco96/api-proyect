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
  import { IngredientService } from '../services/ingredients.service';
  import { IngredientDto } from '../dto/ingredient.dto';
  import { Ingredients } from '../entities/ingredient.entity';
import { ApiTags } from '@nestjs/swagger';
  @ApiTags('Ingredient')
  @Controller('ingredient')
  export class IngredientController {
    constructor(private readonly IngredientService: IngredientService) {}
  
    @Get()
    getProducts() /* : Promise<User[]> */ {
      return this.IngredientService.findAll();
    }
  
    @Post()
    createProduct(@Body() ingredient: IngredientDto): Promise<Ingredients> {
      return this.IngredientService.createIngredient(ingredient);
    }
  
    @Patch(':id')
    async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() changes: IngredientDto) {
      console.log('BY ID', id);
      return this.IngredientService.update(id, changes);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      console.log(
        '🚀 ~ file: users.controller.ts:36 ~ UsersController ~ remove ~ id:',
        id,
      );
      return this.IngredientService.remove(id);
    }
  }