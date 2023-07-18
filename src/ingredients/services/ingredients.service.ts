import { Injectable, Inject, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Ingredients } from '../entities/ingredient.entity';
import { IngredientDto } from '../dto/ingredient.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredients) private ingredientRepository: Repository<Ingredients>,
  ) {}

  async findAll() /* : Promise<User[]> */ {

    return await this.ingredientRepository.find();
  }

  async findOneById(id: number): Promise<Ingredients> {
      const ingredientFound = await this.ingredientRepository.findOne({ where: { id } });
      if (!ingredientFound) {
        throw new NotFoundException('Ingredient Not Found');
      }
      return ingredientFound
  }
  /*  {
    "raw": [],
    "affected": 1
  } */
  async remove(id: number) {
    const ingredientDelete = await this.ingredientRepository.delete(id);
    if (ingredientDelete.affected == 0) {
        throw new HttpException('ingredient Not Found', HttpStatus.NOT_FOUND);
      }
  
      return { ingredientDelete, message: `deleted ingredient with id ${id}` };
    }


  async createIngredient(ingredient: IngredientDto): Promise<Ingredients> {
    const ingredientFound = await this.ingredientRepository.findOne({
        where: {
          name: ingredient.name,
        },
      });
      if (ingredientFound) {
        throw new HttpException('Ingredient already exits', HttpStatus.CONFLICT);
      }
    const newIngredient = this.ingredientRepository.create(ingredient);
    return await this.ingredientRepository.save(newIngredient);

  }
  
  async update(id: number, changes: IngredientDto) {
    const ingredientFound = this.ingredientRepository.findOneBy({ id });
    if (Object.keys(changes).length === 0 || null || undefined) {
        throw new HttpException('I do not enter any data', HttpStatus.CONFLICT);
      }
      if (!ingredientFound) {
        throw new HttpException('ingredient Not Found', HttpStatus.NOT_FOUND);
      }
      const updateIngredient = Object.assign(ingredientFound, changes);
      return await this.ingredientRepository.save(updateIngredient);
  }
}
