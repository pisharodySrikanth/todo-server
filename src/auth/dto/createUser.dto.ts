import { IsNotEmpty, IsString } from 'class-validator';

export default class CreateUser {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
