import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipeConfig, SwaggerConfig, AppConfig } from '@shared/common/config';
import { AppModule } from 'src/app.module';

class NestJSBootstrapApplication {
  public static async start(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    ValidationPipeConfig.configure(app);
    SwaggerConfig.configure(app);
    AppConfig.configure(app);
  }
}

void NestJSBootstrapApplication.start();
