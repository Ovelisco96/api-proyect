import * as dotenv from 'dotenv';
import { IDatabaseConfig } from './interfaces/dbConfig.interface';

dotenv.config();

export const databaseConfig = (): IDatabaseConfig => {
  return {
    development: {
      type: process.env.DIALECT_DATA_BASE,
      username: process.env.USERNAME_DATA_BASE,
      password: process.env.PASSWORD_DATA_BASE,
      database: process.env.DATA_BASE,
      host: process.env.HOST_DATA_BASE,
      port: process.env.PORT_DATA_BASE,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
    },
    test: {
      type: process.env.DIALECT_DATA_BASE,
      username: process.env.USERNAME_DATA_BASE,
      password: process.env.PASSWORD_DATA_BASE,
      database: process.env.DATA_BASE,
      host: process.env.HOST_DATA_BASE,
      port: process.env.PORT_DATA_BASE,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
    },
    production: {
      type: process.env.DIALECT_DATA_BASE,
      username: process.env.USERNAME_DATA_BASE,
      password: process.env.PASSWORD_DATA_BASE,
      database: process.env.DATA_BASE,
      host: process.env.HOST_DATA_BASE,
      port: process.env.PORT_DATA_BASE,
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: true,
    },
  };
};
