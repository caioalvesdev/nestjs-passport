import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDomain } from 'src/modules/user/domain/user.domain';
import { Email } from 'src/modules/user/object-value/email.object-value';
import { IUserRepository } from 'src/modules/user/repository/user.repository.interface';
import { User } from 'src/modules/user/schema/user.schema';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  public async findAll(): Promise<Array<UserDomain>> {
    return (await this.userModel.find()).map((user) =>
      UserDomain.create({
        id: user._id.toString(),
        email: Email.create(user.email),
        password: user.password,
        refreshToken: user.refreshToken || null,
      }),
    );
  }

  public async findByEmail(email: Email): Promise<UserDomain | null> {
    const user = await this.userModel.findOne({ email: email.getValue() });
    if (!user) return null;

    return UserDomain.create({
      id: user._id.toString(),
      email: Email.create(user.email),
      password: user.password,
      refreshToken: user.refreshToken || null,
    });
  }

  public async create(user: UserDomain): Promise<void> {
    await new this.userModel({
      _id: user.getId(),
      email: user.getEmail().getValue(),
      password: user.getPassword(),
    }).save();
  }
}
