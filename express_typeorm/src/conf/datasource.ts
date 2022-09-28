import { DataSourceOptions } from "typeorm/data-source/DataSourceOptions";

export const dataSourceOptions = {
  type: "sqlite",
  database: "database.db",
  logging: true,
  entities: [__dirname + '/../**/entities/*.entity.{js,ts}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
} as DataSourceOptions;
