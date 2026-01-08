import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ValidateUserRefreshTokenAuthUseCase } from 'src/modules/auth/application/use-case';
import { UserResponseDTO } from 'src/modules/auth/presentation/dto/response';
import { TokenPayload } from 'src/modules/auth/type/token-payload.interface';

@Injectable()
export class JwtRefreshStrategy
  extends PassportStrategy(Strategy, 'jwt-refresh')
  implements OnModuleInit
{
  private readonly logger: Logger = new Logger(JwtRefreshStrategy.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly validateUserRefreshTokenUseCase: ValidateUserRefreshTokenAuthUseCase,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => request?.cookies?.Refresh]),
      secretOrKey: configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  public onModuleInit(): void {
    this.logger.log('JwtRefreshStrategy initialized');
  }

  public async validate(request: Request, payload: TokenPayload): Promise<UserResponseDTO> {
    return this.validateUserRefreshTokenUseCase.execute(request.cookies?.Refresh, payload.id);
  }
}
