import { USER_REPOSITORY, type IUserRepository } from '@modules/user/domain/repository';
import { Inject, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase {
  private readonly logger: Logger = new Logger(DeleteUserUseCase.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    this.logger.log(`Deleting user with id: ${id}`);
    await this.userRepository.delete(id);
  }
}
