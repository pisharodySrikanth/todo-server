import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import RefreshToken from './refreshToken.entity';

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
  }

  public deleteByUserId(userId: User['id']) {
    return this.refreshRepository.delete({
      userId,
    });
  }
}
