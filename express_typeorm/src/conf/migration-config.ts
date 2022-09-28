import { DataSource } from "typeorm";
import { dataSourceOptions } from "./datasource";

export const AppDataSource = new DataSource(dataSourceOptions);
