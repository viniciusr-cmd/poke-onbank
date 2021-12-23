import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let PORT = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  await app.listen(PORT);
}
bootstrap();
