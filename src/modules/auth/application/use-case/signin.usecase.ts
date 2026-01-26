import { ICurrentUser } from '@modules/auth/infrastructure/decorator';
import { TokenPayload } from '@modules/auth/type/token-payload.interface';
import { USER_REPOSITORY, type IUserRepository } from '@modules/user/domain/repository';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcryptjs';
import { Response } from 'express';

@Injectable()
export class SigninAuthUseCase {
  private readonly logger: Logger = new Logger(SigninAuthUseCase.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(user: ICurrentUser, response: Response): Promise<void> {
    try {
      const expiresAccessToken = new Date();
      expiresAccessToken.setMilliseconds(
        expiresAccessToken.getTime() +
          parseInt(this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_MS')),
      );

      const expiresRefreshToken = new Date();
      expiresRefreshToken.setMilliseconds(
        expiresRefreshToken.getTime() +
          parseInt(this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION_MS')),
      );

      const tokenPayload: TokenPayload = {
        id: user.id,
        email: user.email,
      };

      const refreshToken = this.jwtService.sign(tokenPayload, {
        secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: `${this.configService.getOrThrow('JWT_REFRESH_TOKEN_EXPIRATION_MS')}ms`,
      });

      const accessToken = this.jwtService.sign(tokenPayload, {
        secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: `${this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_MS')}ms`,
      });

      await this.userRepository.updateRefreshToken(user.id, await hash(refreshToken, 10));

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

      this.logger.log(`User with ID: ${user.id} signed in successfully`);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
