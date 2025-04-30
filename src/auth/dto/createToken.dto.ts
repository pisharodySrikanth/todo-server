import { IsNotEmpty, IsString } from 'class-validator';

export default class LoginDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
