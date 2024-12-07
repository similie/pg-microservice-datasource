import { DataSource } from "typeorm";
import { Entities, IDBConfig } from "./pg-types";
declare const _default: (entities: Entities, config: IDBConfig, forTest?: boolean) => DataSource;
export default _default;
