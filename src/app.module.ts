import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { databaseConfig } from './database/database.config';
import { AppController } from './app.controller';
import { ProductModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    IngredientsModule,
    ProductModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true, load: [databaseConfig] }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
