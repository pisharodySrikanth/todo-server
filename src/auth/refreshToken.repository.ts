import { Injectable } from '@nestjs/common';
import RefreshToken from './refreshToken.entity';
import { User } from 'src/user/user.entity';

let refreshTokens: RefreshToken[] = [];

@Injectable()
export default class RefreshTokenRepository {
  public isValid(token: RefreshToken['token'], userId: User['id']): boolean {
    return refreshTokens.some((r) => r.token === token && r.userId === userId);
  }

  public store(
    userId: User['id'],
    token: RefreshToken['token'],
    exp: RefreshToken['exp'],
  ): void {
    refreshTokens = [
      ...refreshTokens,
      {
        id: refreshTokens.length + 1,
        userId,
        token,
        exp,
      },
    ];
  }

  public deleteByToken(token: RefreshToken['token']) {
    const index = refreshTokens.findIndex((r) => r.token === token);

    if (index === -1) {
      throw new Error('Token not found');
    }

    refreshTokens.splice(index, 1);
  }

  public deleteByUserId(userId: User['id']) {
    refreshTokens = refreshTokens.filter((token) => token.userId !== userId);
  }
}
