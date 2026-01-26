import { ConfigModuleOptions } from '@nestjs/config';
import { EnvironmentVariablesConfig } from './env-validation.config';

export class ModuleConfig {
  public static configure(): ConfigModuleOptions {
    return {
      isGlobal: true,
      validate: EnvironmentVariablesConfig.validate,
    };
  }
}
