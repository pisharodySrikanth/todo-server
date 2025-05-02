import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RequestWithUser } from 'src/types/request';
import CreateTodoDto from './dto/createTodo.dto';
import UpdateTodoDto from './dto/updateTodo.dto';
import { TodoService } from './todo.service';
import AuthGuard from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('todo-lists/:listId/todos')
  public store(
    @Request() request: RequestWithUser,
    @Param('listId') listId: string,
    @Body() body: CreateTodoDto,
  ) {
    return this.todoService.create(request.user.id, Number(listId), body);
  }

  @Put('todos/:id')
  public update(
    @Param('id') id: string,
    @Request() request: RequestWithUser,
    @Body() body: UpdateTodoDto,
  ) {
    return this.todoService.update(Number(id), request.user.id, body);
  }

  @Delete('todos/:id')
  public delete(@Param('id') id: string, @Request() request: RequestWithUser) {
    return this.todoService.delete(Number(id), request.user.id);
  }
}
