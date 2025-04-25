import { Injectable } from '@nestjs/common';
import Todo from './interfaces/todo.interface';
import TodoRepository from './todo.repository';

@Injectable()
export default class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  public async findAll(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  public create(todo: Omit<Todo, 'id'>) {
    return this.todoRepository.create(todo);
  }

  public update(id: number, updatedTodo: Omit<Todo, 'id'>) {
    return this.todoRepository.update(id, updatedTodo);
  }

  public delete(id: number) {
    return this.todoRepository.delete(id);
  }
}
