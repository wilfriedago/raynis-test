import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableShutdownHooks();
  app.enableVersioning({ type: VersioningType.URI });
  app.setGlobalPrefix('api', { exclude: ['/', '/docs', '/uploads'] });

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addServer('http://localhost:8080')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'API Docs',
    jsonDocumentUrl: '/docs/api.json',
    yamlDocumentUrl: '/docs/api.yaml',
  });

  await app.listen(8080);
}

bootstrap();
