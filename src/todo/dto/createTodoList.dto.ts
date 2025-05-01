import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateTodoListDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  // @IsNumber(
  //   {},
  //   {
  //     each: true,
  //   },
  // )
  // todoIds: number[];
}
