import { DataSource } from "typeorm";
import { runtimeDataSourceOptions } from "./pg-config";
import { Entities, IDBConfig } from "./pg-types";

export default (entities: Entities, config: IDBConfig, forTest = false) => {
  const options = runtimeDataSourceOptions(config, forTest);
  return new DataSource({ ...options, entities });
};
