import { Injectable, Inject } from '@nestjs/common';
import { Product } from '../product.entity';
import { ProductDto } from '../dto/product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async findAll() /* : Promise<User[]> */ {
    console.log('aquiiii');

    return await this.productRepository.find();
  }

  async findOneById(id: number): Promise<Product> {
    return await this.productRepository.findOne({ where: { id } });
  }
  /*  {
    "raw": [],
    "affected": 1
  } */
  async remove(id: number) {
    const productDelete = await this.productRepository.delete(id);
    if (productDelete.affected == 1) {
      return { productDelete, message: `deleted user with id ${id}` };
    } else {
      return { message: `user not found` };
    }
  }

  async createProduct(product: ProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return await this.productRepository.save(newProduct);
  }

  update(id: number, changes: ProductDto) {
    const product = this.productRepository.findOneBy({ id });
    if (!product) {
      // Lanza una excepción o devuelve una respuesta adecuada si el usuario no existe
    }
    const productUpdated = Object.assign(product, changes);
    return productUpdated;
  }
}
