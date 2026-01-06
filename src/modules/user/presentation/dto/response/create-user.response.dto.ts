import { Expose } from 'class-transformer';
import { BaseDTO } from 'src/modules/user/presentation/dto/base.dto';

export class CreateUserResponseDTO extends BaseDTO {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly name: string;

  @Expose()
  public readonly email: string;

  @Expose()
  public readonly password: string;
}
