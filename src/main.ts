import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import PostgresDataSource from 'typeOrm.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await PostgresDataSource.initialize().catch((e) =>
    console.error('Error during data source init.', e),
  );
  await app.listen(3001);
}
bootstrap();
