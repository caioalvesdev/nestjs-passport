import { ApiProperty } from '@nestjs/swagger';
import { TransformerUtil } from '@shared/common/util';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CreateUserRequestDTO extends TransformerUtil {
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
