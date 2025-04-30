import { IsNotEmpty, IsString } from 'class-validator';

export default class RefreshDto {
  @IsNotEmpty()
  @IsString()
  expiredToken: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
