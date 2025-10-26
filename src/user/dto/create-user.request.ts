import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserRequestDto {
  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  readonly password: string;
}
