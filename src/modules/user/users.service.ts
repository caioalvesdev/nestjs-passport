import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './infra/database/mongoose/schema/user.schema';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { CreateUserRequestDTO } from './presentation/dto/request/create-user.request.dto';
import { hash } from 'bcryptjs';
import { ListUserResponseDTO } from 'src/modules/user/presentation/dto/response/list-user.response.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(data: CreateUserRequestDTO) {
    await new this.userModel({
      ...data,
      password: await hash(data.password, 10),
    }).save();
  }

  async getUser(query: FilterQuery<User>) {
    const user = (await this.userModel.findOne(query))?.toObject();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUsers(): Promise<Array<ListUserResponseDTO>> {
    const response = await this.userModel.find({});
    return ListUserResponseDTO.toManyInstance(response);
  }

  async updateUser(query: FilterQuery<User>, data: UpdateQuery<User>) {
    return this.userModel.findOneAndUpdate(query, data);
  }
}
