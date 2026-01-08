import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserResponseDTO } from 'src/modules/auth/presentation/dto/response';
import { USER_REPOSITORY, type UserRepository } from 'src/modules/user/domain/repository';
import { Email } from 'src/modules/user/domain/value-object';

@Injectable()
export class CurrentUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(email: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findByEmail(Email.create(email));
    if (!user) throw new NotFoundException('User not found');
    return UserResponseDTO.toInstance(user.toJSON());
  }
}
