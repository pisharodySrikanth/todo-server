import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class UpdateTodoListDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber(
    {},
    {
      each: true,
    },
  )
  todos?: number[];
}
