import { UserResponseDTO } from '@modules/auth/presentation/dto/response';
import { USER_REPOSITORY, type UserRepository } from '@modules/user/domain/repository';
import { Email } from '@modules/user/domain/value-object';
import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';

@Injectable()
export class ValidateUserAuthUseCase {
  private readonly logger: Logger = new Logger(ValidateUserAuthUseCase.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(email: string, password: string): Promise<UserResponseDTO> {
    this.logger.log(`Validating user with email: ${email}`);

    const user = await this.userRepository.findByEmail(Email.create(email));

    if (!user) throw new UnauthorizedException();

    const authenticated = await compare(password, user.getPassword());

    if (!authenticated) throw new UnauthorizedException();

    this.logger.log(`User with email: ${email} successfully validated`);
    return UserResponseDTO.toInstance(user.toJSON());
  }
}
