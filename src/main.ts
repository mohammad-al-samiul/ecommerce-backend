/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { Server } from 'http';

dotenv.config();

let cachedServer: Server;

export default async function bootstrap(): Promise<Server> {
  if (!cachedServer) {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    app.setGlobalPrefix('api');
    await app.init(); // <-- For Vercel, use init() instead of listen()
    cachedServer = app.getHttpAdapter().getInstance();
  }
  return cachedServer;
}

// Call bootstrap locally for development
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then((app) => {
    const port = process.env.PORT ?? 3000;
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  });
}
