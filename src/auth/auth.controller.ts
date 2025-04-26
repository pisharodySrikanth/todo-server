import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginDto from './dto/login.dto';
import SigninDto from './dto/signin.dto';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/users/login')
  public login(@Body() loginDto: LoginDto) {
    return this.authService.authenticate(loginDto.userName, loginDto.password);
  }

  @Post('/users/signin')
  public signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}
