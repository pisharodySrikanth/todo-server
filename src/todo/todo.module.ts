import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryRunnerFactory } from 'src/database/QueryRunnerFactory';
import { TodoListController } from './todo-list.controller';
import TodoList from './todo-list.entity';
import { TodoListService } from './todo-list.service';
import { TodoController } from './todo.controller';
import Todo from './todo.entity';
import { TodoService } from './todo.service';
import { TodoListValidator } from './validators/todoList.validator';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList, Todo])],
  providers: [
    TodoListService,
    TodoService,
    TodoListValidator,
    QueryRunnerFactory,
  ],
  controllers: [TodoListController, TodoController],
})
export class TodoModule {}
