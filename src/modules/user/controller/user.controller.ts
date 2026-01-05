import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guard';
import { CreateUserRequestDTO } from 'src/modules/user/dto/request';
import { CreateUserResponseDTO, ListUserResponseDTO } from 'src/modules/user/dto/response';
import { CreateUserService, ListUserService } from 'src/modules/user/service';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly listUserService: ListUserService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async list(): Promise<Array<ListUserResponseDTO>> {
    return this.listUserService.perform();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  public async create(@Body() request: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    return this.createUserService.perform(request);
  }
}
