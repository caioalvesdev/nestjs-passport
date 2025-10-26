import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from 'src/user/users.service';

@Injectable()
export class ValidateUserAuthService {
  private readonly logger: Logger = new Logger(ValidateUserAuthService.name);

  constructor(private readonly userService: UsersService) {}

  async perform(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.getUser({ email });
      const authenticated = await compare(password, user.password);
      if (!authenticated) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (err) {
      this.logger.error(err);
      throw new UnauthorizedException();
    }
  }
}
