import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   const globalPrefix = 'api/v1/';
  app.setGlobalPrefix(globalPrefix);

    const config = new DocumentBuilder()
    .setTitle('KuiperZ API')
    .setDescription('API documentation for KuiperZ')
    .setVersion('1.0')
    .addTag('kuiperz')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
