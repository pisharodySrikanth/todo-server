import { QueryRunner } from 'typeorm';

export type IQueryRunner = Pick<
  QueryRunner,
  | 'connect'
  | 'startTransaction'
  | 'commitTransaction'
  | 'rollbackTransaction'
  | 'release'
> & {
  manager: Pick<QueryRunner['manager'], 'getRepository'>;
};
