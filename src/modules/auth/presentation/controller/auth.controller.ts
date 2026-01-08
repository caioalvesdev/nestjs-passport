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
import { CurrentUserUseCase, SigninAuthUseCase } from 'src/modules/auth/application/use-case';
import {
  CurrentUser,
  IsPublic,
  type ICurrentUser,
} from 'src/modules/auth/infrastructure/decorator';
import { JwtRefreshAuthGuard, LocalAuthGuard } from 'src/modules/auth/infrastructure/guard';
import { UserResponseDTO } from 'src/modules/auth/presentation/dto/response';

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
