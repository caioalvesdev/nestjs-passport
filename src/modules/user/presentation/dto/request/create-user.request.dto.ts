import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { BaseDTO } from 'src/modules/user/presentation/dto/base.dto';

export class CreateUserRequestDTO extends BaseDTO {
  @IsEmail()
  @ApiProperty()
  @Expose()
  public readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public readonly name: string;

  @IsStrongPassword()
  @ApiProperty()
  @Expose()
  public readonly password: string;
}
