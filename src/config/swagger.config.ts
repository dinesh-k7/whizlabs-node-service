import { DocumentBuilder } from '@nestjs/swagger';

export const options = new DocumentBuilder()
  .setTitle('Swagger')
  .setDescription('Whizlabs Rest API Microservices')
  .setVersion('1.0')
  .build();
