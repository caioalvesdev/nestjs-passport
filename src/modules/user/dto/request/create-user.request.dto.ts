import { Expose } from 'class-transformer';
import { IsEmail, IsStrongPassword } from 'class-validator';
import { BaseDTO } from 'src/modules/user/dto/base.dto';

export class CreateUserRequestDTO extends BaseDTO {
  @IsEmail()
  @Expose()
  public readonly email: string;

  @IsStrongPassword()
  @Expose()
  public readonly password: string;
}
