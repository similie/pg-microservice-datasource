import { DataSource } from "typeorm";
import { Entities, IDBConfig } from "./pg-types";
import { IDataSourceCredentials } from "./pg-config-global";
export declare const defaultTestDataSourceOpt: () => {
    synchronize: boolean;
    migrationsRun: boolean;
    dropSchema: boolean;
};
export declare const testDataSourceCredentials: () => IDataSourceCredentials;
export declare const runtimeTestDataSourceConnection: () => string;
export declare const runtimeTestDataSource: (entities: Entities, config: IDBConfig) => DataSource;
