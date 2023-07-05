import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      // 👈 use TypeOrmModule
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('HOST_DATA_BASE'),
        port: configService.get('PORT_DATA_BASE'),
        username: configService.get('USERNAME_DATA_BASE'),
        password: configService.get('PASSWORD_DATA_BASE'),
        database: configService.get('DATA_BASE'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
