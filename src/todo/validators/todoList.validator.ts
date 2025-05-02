import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import TodoList from '../todo-list.entity';
import Todo from '../todo.entity';

@Injectable()
export class TodoListValidator {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async validate(
    todos: number[],
    listId: TodoList['id'],
    message: string,
  ): Promise<boolean> {
    const sortedTodos = [...todos].sort((a, b) => a - b);

    const todosFromDb = await this.todoRepository.find({
      where: {
        listId,
      },
      select: {
        id: true,
      },
      order: {
        id: 'ASC',
      },
      relations: {
        list: false,
      },
    });

    const isSame =
      todosFromDb.length === sortedTodos.length &&
      sortedTodos.every((id, index) => id === todosFromDb[index].id);

    if (!isSame) {
      throw new BadRequestException(message);
    }

    return isSame;
  }
}
