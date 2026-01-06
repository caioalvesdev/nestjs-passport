import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UpdateUserRequestDTO {
  @IsNotEmpty()
  @Expose()
  public readonly name: string;

  @IsStrongPassword()
  @Expose()
  public readonly password: string;
}
