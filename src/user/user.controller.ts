import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user.request';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { User } from './schema/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() request: CreateUserRequestDto) {
    return this.userService.create(request);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(@CurrentUser() user: User) {
    console.log({ user });
    return this.userService.getUsers();
  }
}
