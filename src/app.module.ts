import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import TodoController from './todo/todo.controller';
import TodoService from './todo/todo.service';
import TodoRepository from './todo/todo.repository';

@Module({
  imports: [],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService, TodoRepository],
})
export class AppModule {}
