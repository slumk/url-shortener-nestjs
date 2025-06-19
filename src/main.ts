import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'utils/logger/logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  const logger = app.get(Logger);
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors()
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('URL Shortener Backend')
      .setDescription('URL Shortener API description')
      .setVersion('1.0')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'JWT',
      )
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory);
    logger.log('Documentation available at /docs');
  }
  await app.listen(port);
}
bootstrap();
