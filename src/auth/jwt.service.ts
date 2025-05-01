import { Injectable } from '@nestjs/common';
import { JwtService as JwtLibService, TokenExpiredError } from '@nestjs/jwt';
import { jwt } from 'src/constants';
import { User } from 'src/user/user.entity';
import RefreshTokenService from './refreshToken.service';

const REFRESH_EXPIRY = 6 * 30 * 24 * 60 * 60; // 6 months in seconds

@Injectable()
export default class JwtService {
  constructor(
    private readonly refreshTokenService: RefreshTokenService,
    private readonly jwtLibService: JwtLibService,
  ) {}

  public createClientToken(userId: User['id'], userName: User['userName']) {
    return this.jwtLibService.signAsync({
      sub: userId,
      userName,
    });
  }

  public async createRefreshToken(userId: User['id']) {
    const token = await this.jwtLibService.signAsync(
      {
        sub: userId,
      },
      {
        expiresIn: REFRESH_EXPIRY,
      },
    );

    await this.refreshTokenService.store(userId, token, REFRESH_EXPIRY);

    return token;
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
