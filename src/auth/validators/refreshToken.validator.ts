import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import RefreshDto from '../dto/refresh.dto';
import RefreshTokenRepository from '../refreshToken.repository';
import JwtPayload from '../types/jwtPayload';

@Injectable()
@ValidatorConstraint({ name: 'tokenExpiry', async: false })
export default class RefreshTokenValidator
  implements ValidatorConstraintInterface
{
  constructor(
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly jwtLibService: JwtService,
  ) {}

  validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    const { expiredToken } = validationArguments?.object as RefreshDto;

    const payload = this.jwtLibService.decode<JwtPayload>(expiredToken);

    return this.refreshTokenRepository.isValid(value, payload.sub);
  }
}
