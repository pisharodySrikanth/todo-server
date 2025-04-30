import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import wait from 'src/utils/wait';
import JwtService from '../jwt.service';

@Injectable()
@ValidatorConstraint({ name: 'tokenExpiry', async: true })
export default class TokenExpiryValidator
  implements ValidatorConstraintInterface
{
  constructor(private readonly jwtService: JwtService) {}

  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    await wait(1000);

    const shouldExpire: boolean = Boolean(validationArguments?.constraints[0]);
    const expired = await this.jwtService.hasExpired(value);

    return shouldExpire ? expired : !expired;
  }
}
