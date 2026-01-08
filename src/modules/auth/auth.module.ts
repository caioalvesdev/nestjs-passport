import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/modules/auth/presentation/controller';
import { JwtRefreshAuthGuard } from 'src/modules/auth/infrastructure/guard';
import {
  CurrentUserUseCase,
  SigninAuthUseCase,
  ValidateUserAuthUseCase,
  ValidateUserRefreshTokenAuthUseCase,
} from 'src/modules/auth/application/use-case';
import { UsersModule } from 'src/modules/user/user.module';
import {
  JwtRefreshStrategy,
  JwtStrategy,
  LocalStrategy,
} from 'src/modules/auth/infrastructure/strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtRefreshAuthGuard,
    SigninAuthUseCase,
    ValidateUserAuthUseCase,
    ValidateUserRefreshTokenAuthUseCase,
    CurrentUserUseCase,
  ],
})
export class AuthModule {}
