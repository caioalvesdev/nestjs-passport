import { UserEntity } from '@modules/user/domain/entity';
import { USER_REPOSITORY, type IUserRepository } from '@modules/user/domain/repository';
import { Email } from '@modules/user/domain/value-object';
import {
  PASSWORD_HASHER,
  type IPasswordHasher,
} from '@modules/user/infrastructure/service/password-hasher.service';
import { CreateUserRequestDTO } from '@modules/user/presentation/dto/request';
import { CreateUserResponseDTO } from '@modules/user/presentation/dto/response';
import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class CreateUserUseCase {
  private readonly logger: Logger = new Logger(CreateUserUseCase.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasherService: IPasswordHasher,
  ) { }

  public async execute(request: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const email = Email.create(request.email);
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      this.logger.warn(`Attempt to create user with existing email: ${request.email}`);
      throw new ConflictException('User with this email already exists');
    }

    const user = UserEntity.create({
      id: new Types.ObjectId().toHexString(),
      name: request.name,
      email,
      password: await this.passwordHasherService.hash(request.password),
    });

    await this.userRepository.create(user);

    this.logger.log(`User created with id: ${user.getId()}`);

    return CreateUserResponseDTO.toInstance(user.toJSON());
  }
}
