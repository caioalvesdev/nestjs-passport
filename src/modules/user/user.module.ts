import { Module } from '@nestjs/common';
import { UserController } from './presentation/controller/user.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CreateUserUseCase,
  ListUserUseCase,
  FindUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from 'src/modules/user/application/use-case';
import { USER_REPOSITORY } from 'src/modules/user/domain/repository';
import {
  User,
  UserSchema,
} from 'src/modules/user/infrastructure/database/mongoose/schema/user.schema';
import {
  BycriptPasswordHasherService,
  PASSWORD_HASHER,
} from 'src/modules/user/infrastructure/service/password-hasher.service';
import { MongooseUserRepository } from 'src/modules/user/infrastructure/database/mongoose/user.orm.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UsersService,
    CreateUserUseCase,
    ListUserUseCase,
    FindUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    {
      provide: PASSWORD_HASHER,
      useClass: BycriptPasswordHasherService,
    },
    {
      provide: USER_REPOSITORY,
      useClass: MongooseUserRepository,
    },
  ],
  exports: [UsersService, USER_REPOSITORY, FindUserUseCase],
})
export class UsersModule {}
