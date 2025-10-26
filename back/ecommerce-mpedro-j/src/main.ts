import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectionSource } from './config/typeorm';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  if (!connectionSource.isInitialized) {
    await connectionSource.initialize();
  }
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecommerce M4')
    .setDescription(
      'This API was developed as part of the 4th module of the Backend Specialization at Henry',
    )
    .setVersion('3.0')
    .addTag('Preloading')
    .addTag('Auth')
    .addTag('Users')
    .addTag('Categories')
    .addTag('Products')
    .addTag('Orders')
    .addTag('Cloudinary')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap()
  .then(() => {
    console.log('Application is running on port 3000');
  })
  .catch((err) => {
    console.error(err);
  });
