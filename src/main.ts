import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipeConfig } from 'src/shared/common/config';

class NestJSBootstrapApplication {
  public static async start(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    ValidationPipeConfig.configure(app);
    app.use(cookieParser());
    await app.listen(process.env.PORT ?? 3000);
  }
}

void NestJSBootstrapApplication.start();
