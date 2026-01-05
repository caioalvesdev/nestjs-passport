import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'src/modules/auth/type/token-payload.interface';
import { User } from 'src/modules/user/schema/user.schema';
import { UsersService } from 'src/modules/user/users.service';
import { Response } from 'express';
import { hash } from 'bcryptjs';

@Injectable()
export class SigninAuthService {
  private readonly logger: Logger = new Logger(SigninAuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async perform(user: User, response: Response) {
    try {
      const expiresAccessToken = new Date();
      expiresAccessToken.setMilliseconds(
        expiresAccessToken.getTime() +
          parseInt(
            this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_MS'),
          ),
      );
      const expiresRefreshToken = new Date();
      expiresRefreshToken.setMilliseconds(
        expiresRefreshToken.getTime() +
          parseInt(
            this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION_MS'),
          ),
      );
      const tokenPayload: TokenPayload = {
        id: user._id.toHexString(),
        email: user.email,
      };

      const refreshToken = this.jwtService.sign(tokenPayload, {
        secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: `${this.configService.getOrThrow(
          'JWT_REFRESH_TOKEN_EXPIRATION_MS',
        )}ms`,
      });

      const accessToken = this.jwtService.sign(tokenPayload, {
        secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: `${this.configService.getOrThrow(
          'JWT_ACCESS_TOKEN_EXPIRATION_MS',
        )}ms`,
      });

      await this.userService.updateUser(
        { _id: user._id },
        { $set: { refreshToken: await hash(refreshToken, 10) } },
      );

      response.cookie('Authentication', accessToken, {
        httpOnly: true,
        expires: expiresAccessToken,
        secure: this.configService.get('NODE_ENV') === 'production',
      });

      response.cookie('Refresh', refreshToken, {
        httpOnly: true,
        expires: expiresRefreshToken,
        secure: this.configService.get('NODE_ENV') === 'production',
      });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
