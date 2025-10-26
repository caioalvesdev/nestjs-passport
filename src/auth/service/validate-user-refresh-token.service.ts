import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class ValidateUserRefreshTokenAuthService {
  private readonly logger: Logger = new Logger(
    ValidateUserRefreshTokenAuthService.name,
  );

  constructor(private readonly userService: UsersService) {}

  async perform(refreshToken: string, userId: string) {
    try {
      const user = await this.userService.getUser({ _id: userId });
      const authenticated = await compare(refreshToken, user.refreshToken!);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException('Refresh token invalid');
    }
  }
}
