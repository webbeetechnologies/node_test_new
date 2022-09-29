import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  SequelizeModuleAsyncOptions,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';

export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'sqlite',
  storage: 'database.db',
  models: [__dirname + '/../**/entities/*.entity.{js,ts}'],
  synchronize: false,
  logging: console.log,
  define: {
    freezeTableName: true,
  },
};

export const sequelizeAsyncConfig: SequelizeModuleAsyncOptions = {
  imports: [ConfigModule.forRoot()],
  inject: [ConfigService],
  useFactory: async (): Promise<SequelizeModuleOptions> => {
    return sequelizeConfig;
  },
};
