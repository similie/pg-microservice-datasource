import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { IDBConfig } from "./pg-types";
import { IDataSourceCredentials } from "./pg-config-global";

/**
 * Creates a postgres db connection options set with the pre-built Similie
 * config and optional 'forTest' param.
 * @param {Partial<ISimilieConfig>} config built with 'buildCommonConfig'
 * @param {boolean} forTest specify true for the test config, defaults to false
 * @returns {PostgresConnectionOptions} for connecting to a live or test db
 */

export const defaultDataSourceOpt = () => {
  return {
    synchronize: process.env["NODE_ENV"] !== "production",
    migrationsRun: false,
    dropSchema: false,
  };
};

export const dataSourceCredentials = (): IDataSourceCredentials => {
  return {
    username: process.env["DB_USERNAME"] || "postgres",
    password: process.env["DB_PASSWORD"] || "postgres",
    database: process.env["DB_DATABASE"] || "postgres",
    host: process.env["DB_HOST"] || "localhost",
    port: process.env["DB_PORT"] ? +process.env["DB_PORT"] : 5432,
  };
};

export const runtimeDataSourceConnection = () => {
  const creds = dataSourceCredentials();
  return `postgres://${creds.username}:${creds.password}@${creds.host}:${creds.port}/${creds.database}`;
};

export const runtimeDataSourceOptions = (
  config: IDBConfig,
  forTest = false,
) => {
  if (config && !config.url) {
    /* no-op */
    throw new Error("Postgred config database param is undefined");
  }
  let options: PostgresConnectionOptions = {
    type: "postgres",
    url: config.url,
  };

  if (!forTest) return options;

  // Add test specfic options
  options = {
    ...options,
    synchronize: true,
    migrationsRun: true,
    dropSchema: true,
  };

  return options;
};
