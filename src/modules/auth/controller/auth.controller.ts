import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { CurrentUser } from 'src/modules/auth/decorator';
import { JwtAuthGuard, JwtRefreshAuthGuard, LocalAuthGuard } from 'src/modules/auth/guard';
import { SigninAuthService } from 'src/modules/auth/service';
import { User } from 'src/modules/user/infra/database/mongoose/schema/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly signinAuthService: SigninAuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  public async signin(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return await this.signinAuthService.perform(user, response);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async me(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  public async refresh(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return await this.signinAuthService.perform(user, response);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Request() req: any): Promise<void> {
    console.log('logout called');
    return req.logout();
  }
}
