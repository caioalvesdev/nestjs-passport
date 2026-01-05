/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../type/token-payload.interface';
import type { Request } from 'express';
import { ValidateUserRefreshTokenAuthService } from 'src/modules/auth/service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    configService: ConfigService,
    private readonly ValidateUserRefreshTokenService: ValidateUserRefreshTokenAuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => request?.cookies?.Refresh]),
      secretOrKey: configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  public async validate(request: Request, payload: TokenPayload) {
    console.log({ payload });
    return this.ValidateUserRefreshTokenService.perform(request.cookies?.Refresh, payload.id);
  }
}
