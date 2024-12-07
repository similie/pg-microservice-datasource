import 'reflect-metadata';
import { BaseEntity, DataSource, EntityManager, EntityTarget } from 'typeorm';
import { IDataSourceCredentials, OverrideOptions } from './pg-data-source/pg-config-global';
import { Entities } from './pg-data-source/pg-types';
export * from './pg-data-source/pg-types';
/**
 * Postgres host manager
 */
export declare class PostgresHostManager {
    private _isForTest;
    private _dataSource;
    private _logger;
    private globalConfig;
    /**
     * Constructor.
     * @param {Entities} entities
     * @param {IDBConfig} config
     */
    constructor();
    /**
     * @name init
     * @description allows us to override the default credentials. Throws an error if it is already initialized
     * @param {Entities} entities
     * @param {IDataSourceCredentials} credentials
     * @param {OverrideOptions?} options
     * @returns {void}
     */
    init(entities: Entities, credentials: IDataSourceCredentials, options?: OverrideOptions): void;
    /**
     * @returns {LogProfile.log}
     */
    get Logger(): any;
    /**
     * Initialize datasource and open database connection
     * @returns {void}
     */
    start(): Promise<void>;
    initialize(): Promise<void>;
    /** simple passthrough for DataSource.isInitialized */
    get isInitialized(): boolean;
    /** Return the instance's TypeORM data source */
    get datasource(): DataSource;
    /** Return a new instance of a TypeORM entity manager */
    get entityManager(): EntityManager;
    /**
     * Gets a TypeORM repository for the named class
     * @param {EntityTarget<Entity>} forTarget Name of entity
     * @returns {EntityManager}
     */
    getRepository<Entity extends BaseEntity>(forTarget: EntityTarget<Entity>): import("typeorm").Repository<Entity>;
    /**
     * Close connections and destroy datasource
     * @returns {void}
     */
    destroy(): Promise<void>;
}
