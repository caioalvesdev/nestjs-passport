import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY, type UserRepository } from 'src/modules/user/domain/repository';
import {
  PASSWORD_HASHER,
  type PasswordHasher,
} from 'src/modules/user/infrastructure/service/password-hasher.service';
import { UpdateUserRequestDTO } from 'src/modules/user/presentation/dto/request';
import { UpdateUserResponseDTO } from 'src/modules/user/presentation/dto/response';

@Injectable()
export class UpdateUserUseCase {
  private readonly logger: Logger = new Logger(UpdateUserUseCase.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasherService: PasswordHasher,
  ) {}

  public async execute(id: string, request: UpdateUserRequestDTO): Promise<UpdateUserResponseDTO> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      this.logger.warn(`Attempt to update non-existing user with id: ${id}`);
      throw new NotFoundException('User not found');
    }

    user.setName(request.name);
    user.setPassword(await this.passwordHasherService.hash(request.password));
    await this.userRepository.update(user);

    this.logger.log(`User updated with id: ${user.getId()}`);
    return UpdateUserResponseDTO.toInstance(user.toJSON());
  }
}
