"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresHostManager = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const logger_1 = require("@similie/logger");
const typedi_1 = require("typedi");
const pg_config_global_1 = require("./pg-data-source/pg-config-global");
const utils_1 = require("../../utils");
__exportStar(require("./pg-data-source/pg-types"), exports);
/**
 * Postgres host manager
 */
let PostgresHostManager = class PostgresHostManager {
    /**
     * Constructor.
     * @param {Entities} entities
     * @param {IDBConfig} config
     */
    constructor() {
        this._isForTest = false;
        this._logger = new logger_1.LogProfile('PostgresHostManager');
    }
    /**
     * @name init
     * @description allows us to override the default credentials. Throws an error if it is already initialized
     * @param {Entities} entities
     * @param {IDataSourceCredentials} credentials
     * @param {OverrideOptions?} options
     * @returns {void}
     */
    init(entities, credentials, options) {
        if (this._dataSource && this._dataSource.isInitialized) {
            throw new Error('The data source has already been initialized');
        }
        this.globalConfig = typedi_1.Container.get(pg_config_global_1.PgDataSource);
        this.globalConfig.create(entities, credentials, options);
        this._dataSource = this.globalConfig.dataSource;
        utils_1.DataSourceRegistry.getInstance().register = this._dataSource;
        this.start();
    }
    /**
     * @returns {LogProfile.log}
     */
    get Logger() {
        return this._logger.log;
    }
    /**
     * Initialize datasource and open database connection
     * @returns {void}
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._dataSource) {
                throw new Error('Data Source not initialized');
            }
            if (this._dataSource.isInitialized)
                return;
            try {
                yield this._dataSource.initialize();
                this.Logger.info(`${this._isForTest ? 'Test' : ''} TypeORM Data Source initialized`);
            }
            catch (error) {
                this.Logger.error(error.message);
            }
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._dataSource) {
                throw new Error('Data Source not initialized');
            }
            if (this._dataSource.isInitialized)
                return;
            yield this._dataSource.initialize();
            this.Logger.info(`${this._isForTest ? 'Test' : ''} TypeORM Data Source initialized`);
        });
    }
    /** simple passthrough for DataSource.isInitialized */
    get isInitialized() {
        if (!this._dataSource) {
            throw new Error('Data Source not initialized');
        }
        return this._dataSource.isInitialized;
    }
    /** Return the instance's TypeORM data source */
    get datasource() {
        if (!this._dataSource) {
            throw new Error('Data Source not initialized');
        }
        return this._dataSource;
    }
    /** Return a new instance of a TypeORM entity manager */
    get entityManager() {
        return new typeorm_1.EntityManager(this._dataSource);
    }
    /**
     * Gets a TypeORM repository for the named class
     * @param {EntityTarget<Entity>} forTarget Name of entity
     * @returns {EntityManager}
     */
    getRepository(forTarget) {
        return this.entityManager.getRepository(forTarget);
    }
    /**
     * Close connections and destroy datasource
     * @returns {void}
     */
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._dataSource) {
                throw new Error('Data Source not initialized');
            }
            if (this._dataSource.isInitialized)
                yield this._dataSource.destroy();
        });
    }
};
PostgresHostManager = __decorate([
    (0, typedi_1.Service)()
], PostgresHostManager);
exports.PostgresHostManager = PostgresHostManager;
