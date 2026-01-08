import {
  SigninAuthUseCase,
  ValidateUserAuthUseCase,
  ValidateUserRefreshTokenAuthUseCase,
  CurrentUserUseCase,
} from '@modules/auth/application/use-case';
import { JwtRefreshAuthGuard } from '@modules/auth/infrastructure/guard';
import {
  LocalStrategy,
  JwtStrategy,
  JwtRefreshStrategy,
} from '@modules/auth/infrastructure/strategy';
import { AuthController } from '@modules/auth/presentation/controller';
import { UsersModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

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
