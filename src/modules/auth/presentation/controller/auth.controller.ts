import { SigninAuthUseCase, CurrentUserUseCase } from '@modules/auth/application/use-case';
import { IsPublic, CurrentUser, type ICurrentUser } from '@modules/auth/infrastructure/decorator';
import { LocalAuthGuard, JwtRefreshAuthGuard } from '@modules/auth/infrastructure/guard';
import { UserResponseDTO } from '@modules/auth/presentation/dto/response';
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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';

@ApiBearerAuth('KEY_AUTH')
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signinAuthService: SigninAuthUseCase,
    private readonly currentUserUseCase: CurrentUserUseCase,
  ) {}

  @IsPublic()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: HttpStatus.OK })
  public async signin(
    @CurrentUser() currentUser: ICurrentUser,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return this.signinAuthService.execute(currentUser, response);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: UserResponseDTO })
  public async me(@CurrentUser() currentUser: ICurrentUser): Promise<UserResponseDTO> {
    return this.currentUserUseCase.execute(currentUser.email);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  @ApiResponse({ status: HttpStatus.OK })
  public async refresh(
    @CurrentUser() currentUser: ICurrentUser,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return this.signinAuthService.execute(currentUser, response);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: HttpStatus.OK })
  public async logout(@Request() req: any): Promise<void> {
    return req.logout();
  }
}
