import { Service } from 'typedi';

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
  synchronize?: boolean;
}
/**
 * @class
 * @name DataSourceCredentials
 * @description allows us to inject credentials or take the management defaults
 */

export class DataSourceCredentials {
  private _credentials: PostgresConnectionOptions;
  public constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    private _entities: Entities,
    credentials?: IDataSourceCredentials,
    private _isTest = false
  ) {
    this._credentials = {
      type: 'postgres',
      synchronize: typeof credentials?.synchronize !== 'undefined' ? credentials?.synchronize : process.env['NODE_ENV'] !== 'production', // turn off in production
      poolSize: credentials?.poolsize || 10,
      entities: this._entities,
      host:
        credentials?.host ||
        process.env['MANAGEMENT_DATABASE_HOST'] ||
        'localhost',
      port:
        credentials?.port ? credentials?.port : process.env['MANAGEMENT_DATABASE_PORT']
          ? process.env['MANAGEMENT_DATABASE_PORT']
            ? +process.env['MANAGEMENT_DATABASE_PORT']
            : 5432
          : 5432,
      username:
        credentials?.username ||
        process.env['MANAGEMENT_DATABASE_USER'] ||
        'wrdims',
      password:
        credentials?.password ||
        process.env['MANAGEMENT_DATABASE_PASS'] ||
        'wrdims',
      database:
        credentials?.database ||
        process.env['MANAGEMENT_DATABASE'] ||
        'postgres',
    };
  }

  public get entities() {
    return this._entities;
  }
  /**
   * @returns {PostgresConnectionOptions}
   */
  public get credentials() {
    return this._credentials;
  }

  public get isTest() {
    return this._isTest;
  }

  public get connectionString() {
    // eslint-disable-next-line max-len
    return `postgres://${this._credentials.username}:${this._credentials.password}@${this._credentials.host}:${this._credentials.port}/${this._credentials.database}`;
  }
}

export type OverrideOptions = {
  synchronize?: boolean;
  migrationsRun?: boolean;
  dropSchema?: boolean;
};

@Service()
export class PgDataSource {
  private _credentials: DataSourceCredentials | undefined;
  private _dataSource: DataSource | undefined;
  /**
   * Creates a postgres db connection options set with the pre-built Similie
   * config and optional 'forTest' param.
   * @param {Entities} entities built with 'buildCommonConfig'
   * @param {IDataSourceCredentials} config specify true for the test config, defaults to false
   * @param {OverrideOptions} optionsOverride specify true for the test config, defaults to false
   * @returns {PostgresConnectionOptions} for connecting to a live or test db
   */
  public create(
    entities: Entities,
    config: IDataSourceCredentials,
    optionsOverride: OverrideOptions = {
      synchronize: process.env['NODE_ENV'] !== 'production',
      migrationsRun: false,
      dropSchema: process.env['NODE_ENV'] === 'test',
    }
  ) {
    this._credentials = new DataSourceCredentials(entities, config);
    const options = {
      ...this._credentials.credentials,
      ...optionsOverride,
    };
    this._dataSource = new DataSource(options);
  }

  public get credentials() {
    return this._credentials;
  }

  public get dataSource() {
    return this._dataSource;
  }
}
