import { DataSource } from 'typeorm';
import { Entities } from './pg-types';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
export interface IDataSourceCredentials {
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    poolsize?: number;
}
/**
 * @class
 * @name DataSourceCredentials
 * @description allows us to inject credentials or take the management defaults
 */
export declare class DataSourceCredentials {
    private _entities;
    private _isTest;
    private _credentials;
    constructor(_entities: Entities, credentials?: IDataSourceCredentials, _isTest?: boolean);
    get entities(): Entities;
    /**
     * @returns {PostgresConnectionOptions}
     */
    get credentials(): PostgresConnectionOptions;
    get isTest(): boolean;
    get connectionString(): string;
}
export type OverrideOptions = {
    synchronize?: boolean;
    migrationsRun?: boolean;
    dropSchema?: boolean;
};
export declare class PgDataSource {
    private _credentials;
    private _dataSource;
    /**
     * Creates a postgres db connection options set with the pre-built Similie
     * config and optional 'forTest' param.
     * @param {Entities} entities built with 'buildCommonConfig'
     * @param {IDataSourceCredentials} config specify true for the test config, defaults to false
     * @param {OverrideOptions} optionsOverride specify true for the test config, defaults to false
     * @returns {PostgresConnectionOptions} for connecting to a live or test db
     */
    create(entities: Entities, config: IDataSourceCredentials, optionsOverride?: OverrideOptions): void;
    get credentials(): DataSourceCredentials | undefined;
    get dataSource(): DataSource | undefined;
}
