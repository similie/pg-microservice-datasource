"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runtimeTestDataSource = exports.runtimeTestDataSourceConnection = exports.testDataSourceCredentials = exports.defaultTestDataSourceOpt = void 0;
const typeorm_1 = require("typeorm");
const pg_config_1 = require("./pg-config");
const defaultTestDataSourceOpt = () => {
    return {
        synchronize: true,
        migrationsRun: true,
        dropSchema: true,
    };
};
exports.defaultTestDataSourceOpt = defaultTestDataSourceOpt;
const testDataSourceCredentials = () => {
    return {
        username: process.env["TEST_DB_USERNAME"] || "postgres",
        password: process.env["TEST_DB_PASSWORD"] || "postgres",
        database: process.env["TEST_DB_DATABASE"] || "postgres",
        host: process.env["TEST_DB_HOST"] || "localhost",
        port: process.env["TEST_DB_PORT"] ? +process.env["TEST_DB_PORT"] : 5432,
    };
};
exports.testDataSourceCredentials = testDataSourceCredentials;
const runtimeTestDataSourceConnection = () => {
    const creds = (0, exports.testDataSourceCredentials)();
    return `postgres://${creds.username}:${creds.password}@${creds.host}:${creds.port}/${creds.database}`;
};
exports.runtimeTestDataSourceConnection = runtimeTestDataSourceConnection;
const runtimeTestDataSource = (entities, config) => {
    const options = (0, pg_config_1.runtimeDataSourceOptions)(config, true);
    return new typeorm_1.DataSource(Object.assign(Object.assign({}, options), { entities }));
};
exports.runtimeTestDataSource = runtimeTestDataSource;
