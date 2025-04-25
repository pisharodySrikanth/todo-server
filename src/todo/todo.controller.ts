import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import TodoService from './todo.service';
import CreateTodoDto from './dto/createTodo.dto';
import UpdateTodoDto from './dto/updateTodo.dto';

@Controller('/todos')
export default class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  public index() {
    return this.todoService.findAll();
  }

  @Post()
  public store(@Body() body: CreateTodoDto) {
    this.todoService.create(body);
  }

  @Put(':id')
  public update(@Param('id') id: string, @Body() body: UpdateTodoDto) {
    this.todoService.update(Number(id), body);
  }

  @Delete(':id')
  public delete(@Param('id') id: string) {
    this.todoService.delete(Number(id));
  }
}
