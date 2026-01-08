import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UpdateUserRequestDTO {
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public readonly name: string;

  @IsStrongPassword()
  @ApiProperty()
  @Expose()
  public readonly password: string;
}
