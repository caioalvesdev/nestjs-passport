import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/modules/auth/controller';
import { JwtRefreshAuthGuard } from 'src/modules/auth/guard';
import {
  SigninAuthService,
  ValidateUserAuthService,
  ValidateUserRefreshTokenAuthService,
} from 'src/modules/auth/service';
import {
  JwtRefreshStrategy,
  JwtStrategy,
  LocalStrategy,
} from 'src/modules/auth/strategy';
import { UsersModule } from 'src/modules/user/user.module';

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
