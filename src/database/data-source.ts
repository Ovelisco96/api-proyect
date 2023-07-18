import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  username: process.env.USERNAME_DATA_BASE,
  password: process.env.PASSWORD_DATA_BASE,
  database: process.env.DATA_BASE,
  host: process.env.HOST_DATA_BASE,
  port: +process.env.PORT_DATA_BASE,
  logging: true,
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [`migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
};
const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
