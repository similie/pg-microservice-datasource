/* eslint-disable @typescript-eslint/ban-types */
import { MixedList, EntitySchema } from 'typeorm';
export type Entities = MixedList<string | Function | EntitySchema<unknown>>;

export interface IDBConfig {
  url: string;
  test?: string;
}
