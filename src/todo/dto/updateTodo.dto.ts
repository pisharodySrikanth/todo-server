import { IsEnum, IsOptional, IsString } from 'class-validator';
import TodoStatuses from '../enums/statuses';

export default class UpdateTodoDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsEnum(TodoStatuses)
  status?: TodoStatuses;
}
