import { Module } from '@nestjs/common';
import { UserController } from './presentation/controller/user.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infra/database/mongoose/schema/user.schema';
import {
  BycriptPasswordHasherService,
  PASSWORD_HASHER,
} from 'src/modules/user/infra/service/password-hasher.service';
import { MongooseUserRepository } from 'src/modules/user/infra/database/mongoose/user.orm.repository';
import {
  CreateUserUseCase,
  ListUserUseCase,
  FindUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from 'src/modules/user/application/use-case';
import { USER_REPOSITORY } from 'src/modules/user/domain/repository';

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
  exports: [UsersService],
})
export class UsersModule {}
