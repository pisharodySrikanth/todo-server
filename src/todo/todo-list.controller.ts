import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import AuthGuard from 'src/auth/auth.guard';
import { User } from 'src/user/user.entity';
import CreateTodoListDto from './dto/createTodoList.dto';
import UpdateTodoListDto from './dto/updateTodoList.dto';
import { TodoListService } from './todo-list.service';
import { TodoListValidator } from './validators/todoList.validator';

@UseGuards(AuthGuard)
@Controller('todo-lists')
export class TodoListController {
  constructor(
    private readonly todoListValidator: TodoListValidator,
    private readonly todoListService: TodoListService,
  ) {}

  @Get('/')
  public get(@Request() request: { user: User }) {
    return this.todoListService.getAll(request.user.id);
  }

  @Get('/:id')
  public getTodoList(
    @Request() request: { user: User },
    @Param('id') id: string,
  ) {
    return this.todoListService.get(request.user.id, Number(id));
  }

  @Post('/')
  public create(
    @Request() request: { user: User },
    @Body() createDto: CreateTodoListDto,
  ) {
    return this.todoListService.create(request.user.id, createDto);
  }

  @Delete('/:id')
  public delete(@Request() request: { user: User }, @Param('id') id: string) {
    return this.todoListService.delete(request.user.id, Number(id));
  }

  @Patch('/:id')
  public async update(
    @Request() request: { user: User },
    @Param('id') id: string,
    @Body() updateDto: UpdateTodoListDto,
  ) {
    if (updateDto.todos !== undefined) {
      await this.todoListValidator.validate(
        updateDto.todos,
        Number(id),
        'Todos sent not matching with the ones present in the list',
      );
    }
    return this.todoListService.update(request.user.id, Number(id), updateDto);
  }
}
