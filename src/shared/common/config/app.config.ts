import { INestApplication, Logger, VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

export class AppConfig {
  private static readonly logger: Logger = new Logger(AppConfig.name);

  public static async configure(app: INestApplication): Promise<void> {
    app.setGlobalPrefix('api');
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
    app.enableCors();
    app.use(helmet());
    app.use(cookieParser());
    await app.listen(process.env.PORT ?? 3000);
    this.logger.log(`Application is running on: ${await app.getUrl()}`);
  }
}
