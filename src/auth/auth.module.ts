import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwt } from 'src/constants';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import JwtService from './jwt.service';
import RefreshTokenRepository from './refreshToken.repository';
import TokenExpiryValidator from './validators/tokenExpiry.validator';
import RefreshTokenValidator from './validators/refreshToken.validator';

@Module({
  imports: [
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
    RefreshTokenRepository,
    TokenExpiryValidator,
    RefreshTokenValidator,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
