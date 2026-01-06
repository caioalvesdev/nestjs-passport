import { Expose } from 'class-transformer';
import { BaseDTO } from 'src/modules/user/presentation/dto/base.dto';

export class UpdateUserResponseDTO extends BaseDTO {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly email: string;

  @Expose()
  public readonly name: string;
}
