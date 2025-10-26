import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user.request';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() request: CreateUserRequestDto) {
    return this.userService.create(request);
  }

  @Get()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,

      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    const users = await this.userService.getUsers();
    console.log({ users });
    return users;
  }
}
