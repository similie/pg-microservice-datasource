"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runtimeDataSourceOptions = exports.runtimeDataSourceConnection = exports.dataSourceCredentials = exports.defaultDataSourceOpt = void 0;
/**
 * Creates a postgres db connection options set with the pre-built Similie
 * config and optional 'forTest' param.
 * @param {Partial<ISimilieConfig>} config built with 'buildCommonConfig'
 * @param {boolean} forTest specify true for the test config, defaults to false
 * @returns {PostgresConnectionOptions} for connecting to a live or test db
 */
const defaultDataSourceOpt = () => {
    return {
        synchronize: process.env["NODE_ENV"] !== "production",
        migrationsRun: false,
        dropSchema: false,
    };
};
exports.defaultDataSourceOpt = defaultDataSourceOpt;
const dataSourceCredentials = () => {
    return {
        username: process.env["DB_USERNAME"] || "postgres",
        password: process.env["DB_PASSWORD"] || "postgres",
        database: process.env["DB_DATABASE"] || "postgres",
        host: process.env["DB_HOST"] || "localhost",
        port: process.env["DB_PORT"] ? +process.env["DB_PORT"] : 5432,
    };
};
exports.dataSourceCredentials = dataSourceCredentials;
const runtimeDataSourceConnection = () => {
    const creds = (0, exports.dataSourceCredentials)();
    return `postgres://${creds.username}:${creds.password}@${creds.host}:${creds.port}/${creds.database}`;
};
exports.runtimeDataSourceConnection = runtimeDataSourceConnection;
const runtimeDataSourceOptions = (config, forTest = false) => {
    if (config && !config.url) {
        /* no-op */
        throw new Error("Postgred config database param is undefined");
    }
    let options = {
        type: "postgres",
        url: config.url,
    };
    if (!forTest)
        return options;
    // Add test specfic options
    options = Object.assign(Object.assign({}, options), { synchronize: true, migrationsRun: true, dropSchema: true });
    return options;
};
exports.runtimeDataSourceOptions = runtimeDataSourceOptions;
