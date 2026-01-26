import { UserResponseDTO } from '@modules/auth/presentation/dto/response';
import { USER_REPOSITORY, type IUserRepository } from '@modules/user/domain/repository';
import { Email } from '@modules/user/domain/value-object';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CurrentUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) { }

  public async execute(email: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findByEmail(Email.create(email));
    if (!user) throw new NotFoundException('User not found');
    return UserResponseDTO.toInstance(user.toJSON());
  }
}
