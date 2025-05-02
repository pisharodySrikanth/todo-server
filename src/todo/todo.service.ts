import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import CreateTodoDto from './dto/createTodo.dto';
import UpdateTodoDto from './dto/updateTodo.dto';
import TodoList from './todo-list.entity';
import Todo from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  public async getAll(userId: User['id'], listId: TodoList['id']) {
    return this.todoRepository.findBy({
      userId,
      listId,
    });
  }

  private async getNextOrderNumber(listId: TodoList['id']) {
    const lastTodo = await this.todoRepository
      .createQueryBuilder('todo')
      .where('todo.listId = :listId', { listId })
      .orderBy('todo.orderNumber', 'DESC')
      .getOne();

    return lastTodo === null ? 1 : lastTodo.orderNumber + 1;
  }

  public async create(
    userId: User['id'],
    listId: TodoList['id'],
    dto: CreateTodoDto,
  ) {
    const todo = new Todo();
    todo.userId = userId;
    todo.listId = listId;
    todo.content = dto.content;
    todo.orderNumber = await this.getNextOrderNumber(listId);

    return this.todoRepository.save(todo);
  }

  public update(todoId: Todo['id'], userId: User['id'], dto: UpdateTodoDto) {
    return this.todoRepository.update(
      {
        id: todoId,
        userId,
      },
      dto,
    );
  }

  public delete(id: Todo['id'], userId: User['id']) {
    return this.todoRepository.softDelete({
      userId,
      id,
    });
  }
}
