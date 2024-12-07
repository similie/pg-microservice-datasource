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
export declare const defaultDataSourceOpt: () => {
    synchronize: boolean;
    migrationsRun: boolean;
    dropSchema: boolean;
};
export declare const dataSourceCredentials: () => IDataSourceCredentials;
export declare const runtimeDataSourceConnection: () => string;
export declare const runtimeDataSourceOptions: (config: IDBConfig, forTest?: boolean) => PostgresConnectionOptions;
