import { ValidateUserAuthUseCase } from '@modules/auth/application/use-case';
import { UserResponseDTO } from '@modules/auth/presentation/dto/response';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) implements OnModuleInit {
  private readonly logger: Logger = new Logger(LocalStrategy.name);

  constructor(private readonly validateUserAuthUseCase: ValidateUserAuthUseCase) {
    super({ usernameField: 'email' });
  }

  public onModuleInit(): void {
    this.logger.log('LocalStrategy initialized');
  }

  public async validate(email: string, password: string): Promise<UserResponseDTO> {
    return this.validateUserAuthUseCase.execute(email, password);
  }
}
