import { USER_REPOSITORY, type UserRepository } from '@modules/user/domain/repository';
import { ListUserResponseDTO } from '@modules/user/presentation/dto/response';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindUserUseCase {
  private readonly logger: Logger = new Logger(FindUserUseCase.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(id: string): Promise<ListUserResponseDTO> {
    this.logger.log(`Finding user with id: ${id}`);
    const response = await this.userRepository.findById(id);

    if (!response) throw new NotFoundException('User not found');

    return ListUserResponseDTO.toInstance(response.toJSON());
  }
}
