import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import RefreshToken from './refreshToken.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export default class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshRepository: Repository<RefreshToken>,
  ) {}

  public async isValid(
    token: RefreshToken['token'],
    userId: User['id'],
  ): Promise<boolean> {
    return this.refreshRepository.existsBy({
      token,
      userId,
    });
  }

  public store(
    userId: User['id'],
    token: RefreshToken['token'],
    exp: RefreshToken['expiry'],
  ) {
    // refreshTokens = [
    //   ...refreshTokens,
    //   {
    //     id: refreshTokens.length + 1,
    //     userId,
    //     token,
    //     exp,
    //   },
    // ];
    const refreshToken = new RefreshToken();
    refreshToken.expiry = exp;
    refreshToken.userId = userId;
    refreshToken.token = token;

    return this.refreshRepository.save(refreshToken);
  }

  public deleteByToken(token: RefreshToken['token'], userId: User['id']) {
    return this.refreshRepository.delete({
      userId,
      token,
    });

    // const index = refreshTokens.findIndex(
    //   (r) => r.token === token && r.userId === userId,
    // );

    // if (index === -1) {
    //   throw new Error('Token not found');
    // }

    // refreshTokens.splice(index, 1);
  }

  public deleteByUserId(userId: User['id']) {
    // refreshTokens = refreshTokens.filter((token) => token.userId !== userId);
    return this.refreshRepository.delete({
      userId,
    });
  }
}
