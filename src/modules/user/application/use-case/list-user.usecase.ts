import { USER_REPOSITORY, type UserRepository } from '@modules/user/domain/repository';
import { ListUserResponseDTO } from '@modules/user/presentation/dto/response';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ListUserUseCase {
  private readonly logger: Logger = new Logger(ListUserUseCase.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(): Promise<Array<ListUserResponseDTO>> {
    const response = await this.userRepository.findAll();

    this.logger.log(`Found ${response.length} users`);

    return ListUserResponseDTO.toManyInstance(response.map((user) => user.toJSON()));
  }
}
