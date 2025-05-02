import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { IQueryRunner } from './types';

@Injectable()
export class QueryRunnerFactory {
  constructor(private readonly dataSource: DataSource) {}

  generate(): IQueryRunner {
    return this.dataSource.createQueryRunner();
  }
}
