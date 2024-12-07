import { DataSource } from "typeorm";
import { runtimeDataSourceOptions } from "./pg-config";
import { Entities, IDBConfig } from "./pg-types";
import { IDataSourceCredentials } from "./pg-config-global";

export const defaultTestDataSourceOpt = () => {
  return {
    synchronize: true,
    migrationsRun: true,
    dropSchema: true,
  };
};

export const testDataSourceCredentials = (): IDataSourceCredentials => {
  return {
    username: process.env["TEST_DB_USERNAME"] || "postgres",
    password: process.env["TEST_DB_PASSWORD"] || "postgres",
    database: process.env["TEST_DB_DATABASE"] || "postgres",
    host: process.env["TEST_DB_HOST"] || "localhost",
    port: process.env["TEST_DB_PORT"] ? +process.env["TEST_DB_PORT"] : 5432,
  };
};

export const runtimeTestDataSourceConnection = () => {
  const creds = testDataSourceCredentials();
  return `postgres://${creds.username}:${creds.password}@${creds.host}:${creds.port}/${creds.database}`;
};

export const runtimeTestDataSource = (
  entities: Entities,
  config: IDBConfig,
) => {
  const options = runtimeDataSourceOptions(config, true);
  return new DataSource({ ...options, entities });
};
