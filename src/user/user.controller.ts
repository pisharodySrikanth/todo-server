import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import AuthGuard from 'src/auth/auth.guard';
import { UserService } from './user.service';

type IUser = { sub: number; userName: string };

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  public get(@Request() request: { user: IUser }) {
    const user: IUser = request.user;

    return this.userService.findByUserName(user.userName);
  }
}
