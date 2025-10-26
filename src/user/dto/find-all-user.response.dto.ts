import { Expose } from 'class-transformer';
import { BaseDTO } from 'src/user/dto/base.dto';

export class FindAllUserResponseDto extends BaseDTO {
  @Expose()
  readonly id: string;

  @Expose()
  readonly email: string;

  @Expose()
  readonly refreshToken: string;
}
