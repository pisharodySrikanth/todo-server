import { Injectable } from '@nestjs/common';
import { JwtService as JwtLibService, TokenExpiredError } from '@nestjs/jwt';
import { jwt } from 'src/constants';
import { User } from 'src/user/user.entity';

@Injectable()
export default class JwtService {
  constructor(private readonly jwtLibService: JwtLibService) {}

  public createClientToken(userId: User['id'], userName: User['userName']) {
    return this.jwtLibService.signAsync({
      sub: userId,
      userName,
    });
  }

  public async hasExpired(token: string) {
    let expired = false;

    try {
      await this.jwtLibService.verifyAsync<{ sub: number }>(token, {
        secret: jwt.secret,
      });
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        expired = true;
      } else {
        throw e;
      }
    }

    return expired;
  }
}
