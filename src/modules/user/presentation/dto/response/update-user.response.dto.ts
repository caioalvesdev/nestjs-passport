import { ApiProperty } from '@nestjs/swagger';
import { TransformerUtil } from '@shared/common/util';
import { Expose } from 'class-transformer';

export class UpdateUserResponseDTO extends TransformerUtil {
  @ApiProperty()
  @Expose()
  public readonly id: string;

  @ApiProperty()
  @Expose()
  public readonly email: string;

  @ApiProperty()
  @Expose()
  public readonly name: string;
}
