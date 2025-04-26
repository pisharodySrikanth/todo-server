import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from 'src/constants';
import { UserService } from 'src/user/user.service';
import SigninDto from './dto/signin.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private createJwtToken(userId: User['id'], userName: User['userName']) {
    return this.jwtService.signAsync({
      sub: userId,
      userName,
    });
  }

  public async authenticate(userName: string, password: string) {
    const user = await this.userService.findByUserName(userName, true);

    if (user === null) {
      throw new UnauthorizedException();
    }

    try {
      const match = await compare(password, user.password);

      if (!match) {
        console.log('not match');
        throw new UnauthorizedException();
      }
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }

    return {
      jwtToken: await this.createJwtToken(user.id, user.userName),
    };
  }

  public async signin(user: SigninDto) {
    const passwordHash = await hash(user.password, BCRYPT_SALT_ROUNDS);

    const newUser = await this.userService.create({
      ...user,
      password: passwordHash,
    });

    return {
      user: newUser,
      jwtToken: await this.createJwtToken(newUser.id, newUser.userName),
    };
  }
}
