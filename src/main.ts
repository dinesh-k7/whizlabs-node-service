import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { options } from './config/swagger.config';
import { AllExceptionsFilter } from './shared/filters/exception.filter';
import config from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = config().PORT || 3020;
  app.useGlobalPipes(new ValidationPipe());

  // Enable HTTP Exception filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // Intialize swagger module
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // Enable validation based on DTO
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  if (config().ENABLE_CORS) {
    app.enableCors();
  }

  await app.listen(port);
}
bootstrap();
