import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwt } from 'src/constants';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import JwtService from './jwt.service';
import RefreshTokenService from './refreshToken.service';
import RefreshTokenValidator from './validators/refreshToken.validator';
import TokenExpiryValidator from './validators/tokenExpiry.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import RefreshToken from './refreshToken.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwt.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    JwtService,
    RefreshTokenService,
    TokenExpiryValidator,
    RefreshTokenValidator,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
