import { IsNotEmpty, IsString, Validate } from 'class-validator';
import TokenExpiryValidator from '../validators/tokenExpiry.validator';
import RefreshTokenValidator from '../validators/refreshToken.validator';

export default class RefreshDto {
  @Validate(TokenExpiryValidator, [true], {
    message: 'Token not expired yet',
  })
  @IsNotEmpty()
  @IsString()
  expiredToken: string;

  @Validate(RefreshTokenValidator, [], {
    message: 'Invalid refresh token',
  })
  @Validate(TokenExpiryValidator, [false], {
    message: 'Refresh token expired',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
