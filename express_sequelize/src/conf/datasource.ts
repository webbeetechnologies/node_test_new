import { SequelizeOptions } from "sequelize-typescript/dist/sequelize/sequelize/sequelize-options";

export const dataSourceOptions = {
  dialect: 'sqlite',
  storage: 'database.db',
  synchronize: false,
  logging: console.log,
  define: {
    freezeTableName: true,
  },
  models: [__dirname + '/../**/entities/*.entity.{js,ts}']
} as SequelizeOptions;
