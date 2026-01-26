import { SigninAuthUseCase, CurrentUserUseCase, SignupAuthUseCase } from '@modules/auth/application/use-case';
import { IsPublic, CurrentUser, type ICurrentUser } from '@modules/auth/infrastructure/decorator';
import { LocalAuthGuard, JwtRefreshAuthGuard } from '@modules/auth/infrastructure/guard';
import { SignupAuthRequestDTO } from '@modules/auth/presentation/dto/request';
import { UserResponseDTO } from '@modules/auth/presentation/dto/response';
import {
  Body,
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
    private readonly signupAuthService: SignupAuthUseCase,
    private readonly currentUserUseCase: CurrentUserUseCase,
  ) { }

  @IsPublic()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED })
  public async signup(
    @Body() response: SignupAuthRequestDTO,
  ): Promise<void> {
    return this.signupAuthService.execute(response);
  }

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
