import { IsPublic } from '@modules/auth/infrastructure/decorator';
import {
  CreateUserUseCase,
  ListUserUseCase,
  UpdateUserUseCase,
  FindUserUseCase,
  DeleteUserUseCase,
} from '@modules/user/application/use-case';
import { CreateUserRequestDTO, UpdateUserRequestDTO } from '@modules/user/presentation/dto/request';
import {
  ListUserResponseDTO,
  CreateUserResponseDTO,
  UpdateUserResponseDTO,
} from '@modules/user/presentation/dto/response';
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
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('KEY_AUTH')
@ApiTags('Users')
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
  @ApiResponse({ status: HttpStatus.OK, type: [ListUserResponseDTO] })
  public async list(): Promise<Array<ListUserResponseDTO>> {
    return this.listUserService.execute();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: ListUserResponseDTO })
  public async find(@Param('id') id: string): Promise<ListUserResponseDTO> {
    return this.findUserService.execute(id);
  }

  @IsPublic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateUserResponseDTO })
  public async create(@Body() request: CreateUserRequestDTO): Promise<CreateUserResponseDTO> {
    return this.createUserService.execute(request);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: UpdateUserResponseDTO })
  public async update(
    @Param('id') id: string,
    @Body() request: UpdateUserRequestDTO,
  ): Promise<UpdateUserResponseDTO> {
    return this.updateUserService.execute(id, request);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  public async delete(@Param('id') id: string): Promise<void> {
    return this.deleteUserService.execute(id);
  }
}
