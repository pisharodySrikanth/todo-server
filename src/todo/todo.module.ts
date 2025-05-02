import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoListController } from './todo-list.controller';
import TodoList from './todo-list.entity';
import { TodoListService } from './todo-list.service';
import { TodoController } from './todo.controller';
import Todo from './todo.entity';
import { TodoService } from './todo.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList, Todo])],
  providers: [TodoListService, TodoService],
  controllers: [TodoListController, TodoController],
})
export class TodoModule {}
