/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api');

  if (process.env.NODE_ENV !== 'production') {
    // In local development, listen on a specific port
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`🚀 Server running at http://localhost:${port}`);
  } else {
    //In production (serverless platforms like Vercel), only initialize the app
    await app.init();
  }
}
bootstrap();
