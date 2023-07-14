import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Products } from '../entity/product.entity';
import { ProductDto } from '../dto/product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Products) private productRepository: Repository<Products>,
  ) {}

  async findAll() /* : Promise<User[]> */ {
    return await this.productRepository.find();
  }

  async findOneById(id: number): Promise<Products> {
    const productFound = await this.productRepository.findOne({
      where: { id },
    });
    if (!productFound) {
      throw new NotFoundException('Product Not Found');
    }
    return productFound;
  }
  /*  {
    "raw": [],
    "affected": 1
  } */
  async remove(id: number) {
    const productDelete = await this.productRepository.delete(id);
    if (productDelete.affected == 0) {
      throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }

    return { productDelete, message: `deleted product with id ${id}` };
  }

  async createProduct(product: ProductDto): Promise<Products> {
    const productFound = await this.productRepository.findOne({
      where: {
        name: product.name,
      },
    });
    if (productFound) {
      throw new HttpException('Product already exits', HttpStatus.CONFLICT);
    }

    const newProduct = this.productRepository.create(product);

    return await this.productRepository.save(newProduct);
  }

  async update(id: number, changes: ProductDto) {
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
