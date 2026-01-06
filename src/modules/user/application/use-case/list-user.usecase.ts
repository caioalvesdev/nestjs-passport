import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, type UserRepository } from 'src/modules/user/domain/repository';
import { ListUserResponseDTO } from 'src/modules/user/presentation/dto/response';

@Injectable()
export class ListUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(): Promise<Array<ListUserResponseDTO>> {
    const response = await this.userRepository.findAll();
    return ListUserResponseDTO.toManyInstance(response.map((user) => user.toJSON()));
  }
}
