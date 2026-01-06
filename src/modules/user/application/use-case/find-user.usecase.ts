import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY, type UserRepository } from 'src/modules/user/domain/repository';
import { ListUserResponseDTO } from 'src/modules/user/presentation/dto/response';

@Injectable()
export class FindUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(id: string): Promise<ListUserResponseDTO> {
    const response = await this.userRepository.findById(id);

    if (!response) throw new NotFoundException('User not found');

    return ListUserResponseDTO.toInstance(response.toJSON());
  }
}
