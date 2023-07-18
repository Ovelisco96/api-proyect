/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { IngredientService } from './services/ingredients.service';
import { IngredientController } from './controller/ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredients } from './entities/ingredient.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Ingredients])],
    providers: [IngredientService],
    controllers: [IngredientController],
    exports: [IngredientService],
})
export class IngredientsModule {}
