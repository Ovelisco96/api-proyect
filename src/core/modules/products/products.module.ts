import { Module } from '@nestjs/common';

import { ProductService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/core/modules/users/user.entity';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [ProductService],
  controllers: [UsersController],
  exports: [ProductService],
})

export class UsersModule {}