import { Inject, Injectable, Logger } from '@nestjs/common';
import { USER_REPOSITORY, type UserRepository } from 'src/modules/user/domain/repository';

@Injectable()
export class DeleteUserUseCase {
  private readonly logger: Logger = new Logger(DeleteUserUseCase.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    this.logger.log(`Deleting user with id: ${id}`);
    await this.userRepository.delete(id);
  }
}
