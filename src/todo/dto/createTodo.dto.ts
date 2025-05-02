import { IsString } from 'class-validator';

export default class CreateTodoDto {
  @IsString()
  content: string;
}
