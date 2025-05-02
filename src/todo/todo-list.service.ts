import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import CreateTodoListDto from './dto/createTodoList.dto';
import UpdateTodoListDto from './dto/updateTodoList.dto';
import TodoList from './todo-list.entity';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoList)
    private readonly todoListRepository: Repository<TodoList>,
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
    const todo = await this.todoListRepository.findOneBy({
      id,
      userId,
    });

    if (todo === null) {
      throw new NotFoundException('Todo not found');
    }

    todo.title = updateDto.title;

    return this.todoListRepository.save(todo);
  }

  public async delete(userId: User['id'], id: TodoList['id']) {
    return this.todoListRepository.softDelete({
      id,
      userId,
    });
  }
}
