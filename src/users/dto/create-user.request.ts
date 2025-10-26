/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  readonly password: string;
}
