import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UserResponseDTO } from 'src/modules/auth/presentation/dto/response';
import { USER_REPOSITORY, type UserRepository } from 'src/modules/user/domain/repository';

@Injectable()
export class ValidateUserRefreshTokenAuthUseCase {
  private readonly logger: Logger = new Logger(ValidateUserRefreshTokenAuthUseCase.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(refreshToken: string, userId: string): Promise<UserResponseDTO> {
    this.logger.log(`Validating refresh token for user ID: ${userId}`);

    const user = await this.userRepository.findById(userId);
    if (!user) throw new UnauthorizedException('User not found');

    if (!user.getRefreshToken()) throw new UnauthorizedException('No refresh token found');

    const authenticated = await compare(refreshToken, user.getRefreshToken()!);

    if (!authenticated) throw new UnauthorizedException();

    this.logger.log(`Refresh token validated for user ID: ${userId}`);

    return UserResponseDTO.toInstance(user.toJSON());
  }
}
