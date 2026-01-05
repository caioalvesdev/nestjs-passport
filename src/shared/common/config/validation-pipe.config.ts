import { INestApplication, ValidationPipe } from '@nestjs/common';

export class ValidationPipeConfig {
  private constructor() {}

  public static configure(app: INestApplication): void {
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
  }
}
