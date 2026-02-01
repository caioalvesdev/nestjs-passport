import { Expose, plainToInstance } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumberString,
  IsString,
  isURL,
  IsUrl,
  Matches,
  validateSync,
} from 'class-validator';

export class EnvironmentVariablesConfig {
  @Expose()
  @IsNotEmpty()
  @IsString()
  public readonly PORT!: string;

  @Expose()
  @IsString()
  public readonly NODE_ENV?: string;

  @Expose()
  @IsNotEmpty()
  @Matches(/^mongodb:\/\/.+:\d+\/.+$/, {
    message: 'MONGODB_URI must be a valid MongoDB connection string',
  })
  public readonly MONGODB_URI!: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  public readonly JWT_ACCESS_TOKEN_SECRET!: string;

  @Expose()
  @IsNotEmpty()
  @IsNumberString()
  public readonly JWT_ACCESS_TOKEN_EXPIRATION_MS!: string;

  @Expose()
  @IsNotEmpty()
  @IsNumberString()
  public readonly JWT_REFRESH_TOKEN_EXPIRATION_MS!: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  public readonly JWT_REFRESH_TOKEN_SECRET!: string;

  static validate(config: Record<string, unknown>): EnvironmentVariablesConfig {
    const validatedConfig = plainToInstance(EnvironmentVariablesConfig, config, {
      enableImplicitConversion: false,
      excludeExtraneousValues: true,
      exposeUnsetFields: true,
    });

    const errors = validateSync(validatedConfig, { skipMissingProperties: false });
    if (errors.length > 0) throw new Error(errors.toString());
    return validatedConfig;
  }
}
