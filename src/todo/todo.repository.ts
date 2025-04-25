import { Injectable } from '@nestjs/common';
import Todo from './interfaces/todo.interface';

const todos: Todo[] = [
  {
    id: 1,
    title: 'Todo 1',
    content: '',
  },
];

@Injectable()
export default class TodoRepository {
  public async findAll(): Promise<Todo[]> {
    return Promise.resolve(todos);
  }

  public create(todo: Omit<Todo, 'id'>) {
    todos.push({
      ...todo,
      id: todos.length + 1,
    });
  }

  public update(id: number, updatedTodo: Omit<Todo, 'id'>) {
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new Error('Todo not found');
    }

    todos[index] = {
      ...todos[index],
      ...updatedTodo,
      id,
    };
  }

  public delete(id: number) {
    const index = todos.findIndex((t) => t.id === id);

    if (index === -1) {
      throw new Error('Todo not found');
    }

    todos.splice(index, 1);
  }
}
