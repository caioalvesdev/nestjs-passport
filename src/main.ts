import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipeConfig } from 'src/shared/common/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { VersioningType } from '@nestjs/common';
import helmet from 'helmet';

class NestJSBootstrapApplication {
  public static async start(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    ValidationPipeConfig.configure(app);

    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
    app.enableCors();
    app.use(helmet());
    app.use(cookieParser());
    await app.listen(process.env.PORT ?? 3000);
  }
}

void NestJSBootstrapApplication.start();
