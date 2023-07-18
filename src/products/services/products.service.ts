import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Products } from '../entity/product.entity';
import { FilterProductDto, ProductDto } from '../dto/product.dto';
import { Between, Repository, FindOptionsWhere, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredients } from '../../ingredients/entities/ingredient.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Ingredients)
    private ingredientRepository: Repository<Ingredients>,
    @InjectRepository(Products) private productRepository: Repository<Products>,
  ) { }

  async findAll(params?: FilterProductDto): Promise<Products[]> {
    if (params) {
      const { limit, offset, maxPrice, minPrice } = params;
      const where: FindOptionsWhere<Products> = {};

      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }

      return this.productRepository.find({
        relations: ['ingredients'],
        take: limit,
        skip: offset,
      });
    }

    return await this.productRepository.find({
      relations: ['ingredients'],
    });
  }

  async findOneById(id: number): Promise<Products> {
    const productFound = await this.productRepository.findOne({
      where: { id },
      relations: ['ingredients'],
    });
    if (!productFound) {
      throw new NotFoundException('Product Not Found');
    }
    return productFound;
  }
  async remove(id: number) {
    const productDelete = await this.productRepository.delete(id);
    if (productDelete.affected == 0) {
      throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }

    return { productDelete, message: `deleted product with id ${id}` };
  }

  async createProduct(product: ProductDto): Promise<Products> {
    const { ingredientsIds } = product;
    const productFound = await this.productRepository.findOne({
      where: {
        name: product.name,
      },
    });

    if (productFound) {
      throw new HttpException('Product already exits', HttpStatus.CONFLICT);
    }
    const newProduct = this.productRepository.create(product);
    if (product.ingredientsIds) {
      const ingredients = await this.ingredientRepository.findBy({
        id: In(ingredientsIds),
      });
      newProduct.ingredients = ingredients;
    }
    return await this.productRepository.save(newProduct);
  }

  async addIngredientToProduct(id: number, ingredientId: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['ingredients'],
    });

    const ingredient = await this.ingredientRepository.findOne({
      where: { id: ingredientId },
    });

    product.ingredients.push(ingredient);
    return this.productRepository.save(product);
  }

  async removeIngredientByProduct(id: number, ingredientsId: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['ingredients'],
    });
    product.ingredients = product.ingredients.filter(
      (item) => item.id !== ingredientsId,
    );
    return this.productRepository.save(product);
  }

  async update(id: number, changes: ProductDto): Promise<Products> {
    const productFound = this.productRepository.findOneBy({ id });
    if (Object.keys(changes).length === 0 || null || undefined) {
      throw new HttpException('I do not enter any data', HttpStatus.CONFLICT);
    }
    if (!productFound) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    const updateUser = Object.assign(productFound, changes);
    return await this.productRepository.save(updateUser);
  }
}
