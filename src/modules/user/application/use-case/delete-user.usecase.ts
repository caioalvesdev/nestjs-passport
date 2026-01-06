import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, type UserRepository } from 'src/modules/user/domain/repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
