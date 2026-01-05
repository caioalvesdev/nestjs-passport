import { Inject, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { UserDomain } from 'src/modules/user/domain/user.domain';
import { CreateUserRequestDTO } from 'src/modules/user/dto/request/create-user.request.dto';
import { CreateUserResponseDTO } from 'src/modules/user/dto/response/create-user.response.dto';
import { Email } from 'src/modules/user/object-value/email.object-value';
import type { PasswordHasher } from 'src/modules/user/provider/password-hasher.provider';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { TOKENS } from 'src/shared/common/constant/tokens.constant';

@Injectable()
export class CreateUserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(TOKENS.PASSWORD_HASHER)
    private readonly passwordHasherProvider: PasswordHasher,
  ) {}

  public async perform(request: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    const user = UserDomain.create({
      id: new Types.ObjectId().toHexString(),
      email: Email.create(request.email),
      password: await this.passwordHasherProvider.hash(request.password),
    });

    await this.userRepository.create(user);

    return CreateUserResponseDTO.toInstance(user.toJSON());
  }
}
