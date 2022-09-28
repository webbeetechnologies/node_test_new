import { DataSource } from "typeorm"
import datasource from "../conf/datasource";

const AppDataSource = new DataSource(datasource)

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })
