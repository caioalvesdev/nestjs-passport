import { INestApplication, VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

export class AppConfig {
  public static readonly PORT = process.env.APP_PORT || 3000;

  public static async configure(app: INestApplication): Promise<void> {
    app.setGlobalPrefix('api');
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
    app.enableCors();
    app.use(helmet());
    app.use(cookieParser());
    await app.listen(process.env.PORT ?? 3000);
  }
}
