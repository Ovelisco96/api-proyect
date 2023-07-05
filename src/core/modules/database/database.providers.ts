import { DataSource } from 'typeorm';
import { User } from '../../models/User.model';
import { databaseConfig } from './database.config';
import { Roles } from '../../models/Roles.model';
import { log } from 'console';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: databaseConfig.development.host,
        port: +databaseConfig.development.port,
        username: databaseConfig.development.username,
        password: databaseConfig.development.password,
        database: databaseConfig.development.database,
        entities: [User, Roles],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
