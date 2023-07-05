import * as dotenv from 'dotenv';
import { IDatabaseConfig } from './interfaces/dbConfig.interface';

dotenv.config();

export const databaseConfig = {
  development: {
    type: process.env.DIALECT_DATA_BASE,
    username: process.env.USERNAME_DATA_BASE,
    password: process.env.PASSWORD_DATA_BASE,
    database: process.env.DATA_BASE,
    host: process.env.HOST_DATA_BASE,
    port: process.env.PORT_DATA_BASE,
    entities: [],
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    type: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_PRODUCTION,
    host: process.env.DB_HOST,
    type: process.env.DB_DIALECT,
  },
};
