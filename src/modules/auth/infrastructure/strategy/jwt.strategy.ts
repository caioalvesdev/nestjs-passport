import { UserResponseDTO } from '@modules/auth/presentation/dto/response';
import { TokenPayload } from '@modules/auth/type/token-payload.interface';
import { USER_REPOSITORY, type IUserRepository } from '@modules/user/domain/repository';
import { Inject, Injectable, Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) implements OnModuleInit {
  private readonly logger: Logger = new Logger(JwtStrategy.name);

  constructor(
    public readonly configService: ConfigService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => (request?.cookies as any)?.Authentication,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  public onModuleInit(): void {
    this.logger.log('JwtStrategy initialized');
  }

  public async validate(payload: TokenPayload): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(payload.id);
    if (!user) {
      this.logger.error(`User with ID: ${payload.id} not found`);
      throw new UnauthorizedException();
    }
    return UserResponseDTO.toInstance(user.toJSON());
  }
}
