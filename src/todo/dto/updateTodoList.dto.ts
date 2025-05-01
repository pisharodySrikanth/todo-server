import { IsNotEmpty, IsString } from 'class-validator';

export default class UpdateTodoListDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
