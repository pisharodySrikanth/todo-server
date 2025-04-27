import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import SigninDto from './dto/signin.dto';
import RefreshDto from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  public login(@Body() loginDto: LoginDto) {
    return this.authService.authenticate(loginDto.userName, loginDto.password);
  }

  @Post('/signup')
  public signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Post('/refresh')
  public refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(
      refreshDto.expiredToken,
      refreshDto.refreshToken,
    );
  }
}
