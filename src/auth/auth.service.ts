import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService as JwtLibService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from 'src/constants';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import CreateUserDto from './dto/createUser.dto';
import JwtService from './jwt.service';
import RefreshTokenRepository from './refreshToken.repository';
import JwtPayload from './types/jwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtLibService: JwtLibService,
  ) {}

  public async createToken(userName: string, password: string) {
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
      jwtToken: await this.jwtService.createClientToken(user.id, user.userName),
      refreshToken: await this.jwtService.createRefreshToken(user.id),
    };
  }

  public async createUser(user: CreateUserDto) {
    const passwordHash = await hash(user.password, BCRYPT_SALT_ROUNDS);

    const newUser = await this.userService.create({
      ...user,
      password: passwordHash,
    });

    return {
      user: newUser,
      jwtToken: await this.jwtService.createClientToken(
        newUser.id,
        newUser.userName,
      ),
      refreshToken: await this.jwtService.createRefreshToken(newUser.id),
    };
  }

  public async createRefreshedToken(
    expiredToken: string,
    refreshToken: string,
  ) {
    const expired = await this.jwtService.hasExpired(expiredToken);

    if (!expired) {
      throw new BadRequestException('Token not expired yet');
    }

    const refreshTokenExpired = await this.jwtService.hasExpired(refreshToken);

    if (refreshTokenExpired) {
      throw new BadRequestException('Refresh token expired');
    }

    const payload = this.jwtLibService.decode<JwtPayload>(expiredToken);
    const isRefreshTokenValid = this.refreshTokenRepository.isValid(
      refreshToken,
      payload.sub,
    );

    if (!isRefreshTokenValid) {
      throw new BadRequestException('Invalid refresh token');
    }

    return {
      jwtToken: await this.jwtService.createClientToken(
        payload.sub,
        payload.userName,
      ),
    };
  }

  public deleteRefreshToken(userId: User['id'], refreshToken: string) {
    return this.refreshTokenRepository.deleteByToken(refreshToken, userId);
  }
}
