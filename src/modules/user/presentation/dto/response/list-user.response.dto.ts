import { ApiProperty } from '@nestjs/swagger';
import { TransformerUtil } from '@shared/common/util';
import { Expose } from 'class-transformer';

export class ListUserResponseDTO extends TransformerUtil {
  @ApiProperty()
  @Expose()
  public readonly id: string;

  @ApiProperty()
  @Expose()
  public readonly name: string;

  @ApiProperty()
  @Expose()
  public readonly email: string;

  @ApiProperty()
  @Expose()
  public readonly refreshToken: string | null;
}
