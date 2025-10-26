import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/auth/controller';
import { JwtRefreshAuthGuard } from 'src/auth/guard';
import {
  SigninAuthService,
  ValidateUserAuthService,
  ValidateUserRefreshTokenAuthService,
} from 'src/auth/service';
import {
  JwtRefreshStrategy,
  JwtStrategy,
  LocalStrategy,
} from 'src/auth/strategy';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [UsersModule, PassportModule, JwtModule],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    JwtRefreshAuthGuard,
    SigninAuthService,
    ValidateUserAuthService,
    ValidateUserRefreshTokenAuthService,
  ],
})
export class AuthModule {}
