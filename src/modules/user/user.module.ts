import {
  CreateUserUseCase,
  DeleteUserUseCase,
  FindUserUseCase,
  ListUserUseCase,
  UpdateUserUseCase,
} from '@modules/user/application/use-case';
import { USER_REPOSITORY } from '@modules/user/domain/repository';
import { User, UserSchema } from '@modules/user/infrastructure/database/mongoose/schema';
import { MongooseUserRepository } from '@modules/user/infrastructure/database/mongoose/user.orm.repository';
import {
  BycriptPasswordHasherService,
  PASSWORD_HASHER,
} from '@modules/user/infrastructure/service/password-hasher.service';
import { UserController } from '@modules/user/presentation/controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

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
  exports: [USER_REPOSITORY, FindUserUseCase],
})
export class UsersModule {}
