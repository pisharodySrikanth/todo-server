import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/user/user.entity';
import AuthGuard from './auth.guard';
import { AuthService } from './auth.service';
import CreateToken from './dto/createToken.dto';
import CreateUser from './dto/createUser.dto';
import RefreshDto from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/token')
  public createToken(@Body() createTokenDto: CreateToken) {
    return this.authService.createToken(
      createTokenDto.userName,
      createTokenDto.password,
    );
  }

  @Post('/user')
  public createUser(@Body() createUser: CreateUser) {
    return this.authService.createUser(createUser);
  }

  @Post('/refreshed-token')
  public createRefreshedToken(@Body() refreshDto: RefreshDto) {
    return this.authService.createRefreshedToken(refreshDto.expiredToken);
  }

  @UseGuards(AuthGuard)
  @Delete('/refresh-token/:refreshToken')
  public deleteRefreshToken(
    @Request() request: { user: User },
    @Param('refreshToken') refreshToken: string,
  ) {
    return this.authService.deleteRefreshToken(request.user.id, refreshToken);
  }
}
