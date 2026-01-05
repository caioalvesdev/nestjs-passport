import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { use } from 'passport';
import { TOKENS } from 'src/shared/common/constant/tokens.constant';
import { BycriptPasswordHasherProvider } from 'src/modules/user/provider/password-hasher.provider';
import { CreateUserService } from 'src/modules/user/service/create-user.service';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { ListUserService } from 'src/modules/user/service/list-user.service';

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
    CreateUserService,
    ListUserService,
    UserRepository,
    {
      provide: TOKENS.PASSWORD_HASHER,
      useClass: BycriptPasswordHasherProvider,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
