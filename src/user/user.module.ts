import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwt } from 'src/constants';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwt.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
