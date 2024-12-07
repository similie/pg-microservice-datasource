"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgDataSource = exports.DataSourceCredentials = void 0;
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
/**
 * @class
 * @name DataSourceCredentials
 * @description allows us to inject credentials or take the management defaults
 */
class DataSourceCredentials {
    constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
    _entities, credentials, _isTest = false) {
        this._entities = _entities;
        this._isTest = _isTest;
        this._credentials = {
            type: 'postgres',
            synchronize: process.env['NODE_ENV'] !== 'production',
            poolSize: (credentials === null || credentials === void 0 ? void 0 : credentials.poolsize) || 10,
            entities: this._entities,
            host: (credentials === null || credentials === void 0 ? void 0 : credentials.host) ||
                process.env['MANAGEMENT_DATABASE_HOST'] ||
                'localhost',
            port: (credentials === null || credentials === void 0 ? void 0 : credentials.port) || process.env['MANAGEMENT_DATABASE_PORT']
                ? process.env['MANAGEMENT_DATABASE_PORT']
                    ? +process.env['MANAGEMENT_DATABASE_PORT']
                    : 5432
                : 5432,
            username: (credentials === null || credentials === void 0 ? void 0 : credentials.username) ||
                process.env['MANAGEMENT_DATABASE_USER'] ||
                'wrdims',
            password: (credentials === null || credentials === void 0 ? void 0 : credentials.password) ||
                process.env['MANAGEMENT_DATABASE_PASS'] ||
                'wrdims',
            database: (credentials === null || credentials === void 0 ? void 0 : credentials.database) ||
                process.env['MANAGEMENT_DATABASE'] ||
                'postgres',
        };
    }
    get entities() {
        return this._entities;
    }
    /**
     * @returns {PostgresConnectionOptions}
     */
    get credentials() {
        return this._credentials;
    }
    get isTest() {
        return this._isTest;
    }
    get connectionString() {
        // eslint-disable-next-line max-len
        return `postgres://${this._credentials.username}:${this._credentials.password}@${this._credentials.host}:${this._credentials.port}/${this._credentials.database}`;
    }
}
exports.DataSourceCredentials = DataSourceCredentials;
let PgDataSource = class PgDataSource {
    /**
     * Creates a postgres db connection options set with the pre-built Similie
     * config and optional 'forTest' param.
     * @param {Entities} entities built with 'buildCommonConfig'
     * @param {IDataSourceCredentials} config specify true for the test config, defaults to false
     * @param {OverrideOptions} optionsOverride specify true for the test config, defaults to false
     * @returns {PostgresConnectionOptions} for connecting to a live or test db
     */
    create(entities, config, optionsOverride = {
        synchronize: process.env['NODE_ENV'] !== 'production',
        migrationsRun: false,
        dropSchema: process.env['NODE_ENV'] === 'test',
    }) {
        this._credentials = new DataSourceCredentials(entities, config);
        const options = Object.assign(Object.assign({}, this._credentials.credentials), optionsOverride);
        this._dataSource = new typeorm_1.DataSource(options);
    }
    get credentials() {
        return this._credentials;
    }
    get dataSource() {
        return this._dataSource;
    }
};
PgDataSource = __decorate([
    (0, typedi_1.Service)()
], PgDataSource);
exports.PgDataSource = PgDataSource;
