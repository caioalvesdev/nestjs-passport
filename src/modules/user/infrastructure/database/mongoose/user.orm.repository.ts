import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from 'src/modules/user/domain/entity/user.entity';
import { UserRepository } from 'src/modules/user/domain/repository/user.repository.interface';
import { Email } from 'src/modules/user/domain/value-object/email.vo';
import { User } from 'src/modules/user/infrastructure/database/mongoose/schema/user.schema';

@Injectable()
export class MongooseUserRepository implements UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  public async findAll(): Promise<Array<UserEntity>> {
    return (await this.userModel.find()).map((user) =>
      UserEntity.create({
        id: user._id.toString(),
        name: user.name,
        email: Email.create(user.email),
        password: user.password,
        refreshToken: user.refreshToken || null,
      }),
    );
  }

  public async findByEmail(email: Email): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({ email: email.getValue() });
    if (!user) return null;

    return UserEntity.create({
      id: user._id.toString(),
      name: user.name,
      email: Email.create(user.email),
      password: user.password,
      refreshToken: user.refreshToken || null,
    });
  }

  public async findById(id: string): Promise<UserEntity | null> {
    const user = await this.userModel.findById(id);
    if (!user) return null;

    return UserEntity.create({
      id: user._id.toString(),
      name: user.name,
      email: Email.create(user.email),
      password: user.password,
      refreshToken: user.refreshToken || null,
    });
  }

  public async create(user: UserEntity): Promise<void> {
    await new this.userModel({
      _id: user.getId(),
      name: user.getName(),
      email: user.getEmail().getValue(),
      password: user.getPassword(),
    }).save();
  }

  public async update(user: UserEntity): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { _id: user.getId() },
      {
        $set: {
          email: user.getEmail().getValue(),
          name: user.getName(),
          password: user.getPassword(),
          refreshToken: user.getRefreshToken(),
        },
      },
    );
  }

  public async updateRefreshToken(id: string, refreshToken: string | null): Promise<void> {
    await this.userModel.updateOne(
      { _id: id },
      {
        $set: {
          refreshToken,
        },
      },
    );
  }

  public async delete(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id });
  }
}
