import { ApiProperty } from '@nestjs/swagger';
import { TransformerUtil } from '@shared/common/util';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class UpdateUserRequestDTO extends TransformerUtil {
  @IsNotEmpty()
  @ApiProperty()
  @Expose()
  public readonly name: string;

  @IsStrongPassword()
  @ApiProperty()
  @Expose()
  public readonly password: string;
}
