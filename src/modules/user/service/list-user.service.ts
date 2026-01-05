import { Injectable } from '@nestjs/common';
import { ListUserResponseDTO } from 'src/modules/user/dto/response/list-user.response.dto';
import { UserRepository } from 'src/modules/user/repository/user.repository';

@Injectable()
export class ListUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async perform(): Promise<Array<ListUserResponseDTO>> {
    const response = await this.userRepository.findAll();
    return ListUserResponseDTO.toManyInstance(response.map((user) => user.toJSON()));
  }
}
