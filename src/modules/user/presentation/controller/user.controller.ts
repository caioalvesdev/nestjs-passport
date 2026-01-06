import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guard';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  FindUserUseCase,
  ListUserUseCase,
  UpdateUserUseCase,
} from 'src/modules/user/application/use-case';
import {
  CreateUserRequestDTO,
  UpdateUserRequestDTO,
} from 'src/modules/user/presentation/dto/request';
import {
  CreateUserResponseDTO,
  ListUserResponseDTO,
  UpdateUserResponseDTO,
} from 'src/modules/user/presentation/dto/response';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserService: CreateUserUseCase,
    private readonly listUserService: ListUserUseCase,
    private readonly updateUserService: UpdateUserUseCase,
    private readonly findUserService: FindUserUseCase,
    private readonly deleteUserService: DeleteUserUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async list(): Promise<Array<ListUserResponseDTO>> {
    return this.listUserService.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async find(@Param('id') id: string): Promise<ListUserResponseDTO> {
    return this.findUserService.execute(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() request: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    return this.createUserService.execute(request);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async update(
    @Param('id') id: string,
    @Body() request: UpdateUserRequestDTO,
  ): Promise<UpdateUserResponseDTO> {
    return this.updateUserService.execute(id, request);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  public async delete(@Param('id') id: string): Promise<void> {
    return this.deleteUserService.execute(id);
  }
}
