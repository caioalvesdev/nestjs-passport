import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  private constructor() {}

  public static configure(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('NestJS API - Passport')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'Bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          description: 'Enter token',
          in: 'header',
        },
        'KEY_AUTH',
      )
      .setDescription('API documentation for NestJS application using Passport for authentication.')
      .setVersion('1.0')
      .build();

    const document = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }
}
