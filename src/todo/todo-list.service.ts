import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunnerFactory } from 'src/database/QueryRunnerFactory';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import CreateTodoListDto from './dto/createTodoList.dto';
import UpdateTodoListDto from './dto/updateTodoList.dto';
import TodoList from './todo-list.entity';
import { TodoService } from './todo.service';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoList)
    private readonly todoListRepository: Repository<TodoList>,
    private readonly todoService: TodoService,
    private readonly queryRunnerFactory: QueryRunnerFactory,
  ) {}

  public async getAll(userId: User['id']) {
    return this.todoListRepository.find({
      where: {
        userId,
      },
      relations: {
        todos: true,
      },
    });
  }

  public async get(userId: User['id'], id: TodoList['id']) {
    return this.todoListRepository.findOneBy({
      id,
      userId,
    });
  }

  public async create(userId: User['id'], createDto: CreateTodoListDto) {
    const lastTodo = await this.todoListRepository
      .createQueryBuilder('todoList')
      .limit(1)
      .where('todoList.user_id = :userId', { userId })
      .orderBy('todoList.order_number', 'DESC')
      .getOne();
    const nextOrder = lastTodo === null ? 1 : lastTodo.orderNumber + 1;

    const todoList = new TodoList();
    todoList.title = createDto.title;
    todoList.userId = userId;
    todoList.orderNumber = nextOrder;

    return this.todoListRepository.save(todoList);
  }

  public async update(
    userId: User['id'],
    id: TodoList['id'],
    updateDto: UpdateTodoListDto,
  ) {
    const queryRunner = this.queryRunnerFactory.generate();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const repository = queryRunner.manager.getRepository(TodoList);
      const queries: Promise<any>[] = [
        repository.update(
          {
            id,
            userId,
          },
          {
            title: updateDto.title,
          },
        ),
      ];

      if (updateDto.todos !== undefined) {
        queries.push(
          this.todoService.reorderTodos(updateDto.todos, id, queryRunner),
        );
      }

      await Promise.all(queries);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  public async delete(userId: User['id'], id: TodoList['id']) {
    return this.todoListRepository.softDelete({
      id,
      userId,
    });
  }
}
