import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDTO } from 'src/modules/user/presentation/dto/base.dto';

export class UserResponseDTO extends BaseDTO {
  @ApiProperty()
  @Expose()
  public readonly id: string;

  @ApiProperty()
  @Expose()
  public readonly email: string;

  @ApiProperty()
  @Expose()
  public readonly name: string;

  @ApiProperty()
  @Expose()
  public readonly refreshToken: string | null;
}
