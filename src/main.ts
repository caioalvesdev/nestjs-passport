import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppConfig, SwaggerConfig, ValidationPipeConfig } from 'src/shared/common/config';
import { AppModule } from './app.module';

class NestJSBootstrapApplication {
  public static async start(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    ValidationPipeConfig.configure(app);
    SwaggerConfig.configure(app);
    AppConfig.configure(app);
  }
}

void NestJSBootstrapApplication.start();
