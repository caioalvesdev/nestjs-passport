import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipeConfig, SwaggerConfig, AppConfig } from 'src/core/config';
import { CoreModule } from 'src/core/core.module';

class NestJSBootstrapApplication {
  public static async start(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(CoreModule);

    ValidationPipeConfig.configure(app);
    SwaggerConfig.configure(app);
    await AppConfig.configure(app);
  }
}

void NestJSBootstrapApplication.start();
