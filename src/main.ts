import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.PORT || 3000
  await app.listen(port, () => {
    console.log('Server is working')
    setInterval(() => {
        console.log('Server is working')
    }, 900000);
  });
}

bootstrap();
