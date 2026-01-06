import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { BaseDTO } from 'src/modules/user/presentation/dto/base.dto';

export class CreateUserRequestDTO extends BaseDTO {
  @IsEmail()
  @Expose()
  public readonly email: string;

  @IsNotEmpty()
  @Expose()
  public readonly name: string;

  @IsStrongPassword()
  @Expose()
  public readonly password: string;
}
