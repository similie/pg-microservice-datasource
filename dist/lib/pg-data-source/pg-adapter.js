"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const pg_config_1 = require("./pg-config");
exports.default = (entities, config, forTest = false) => {
    const options = (0, pg_config_1.runtimeDataSourceOptions)(config, forTest);
    return new typeorm_1.DataSource(Object.assign(Object.assign({}, options), { entities }));
};
