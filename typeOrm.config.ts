import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from 'src/user/user.entity';

config();

const configService = new ConfigService();

const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [User],
  // entities: ['*.entity.ts'],
  synchronize: true,
  // entities: [__dirname + '/**/*.entity.{js,ts}'],
  // migrations: ['./src/database/migrations/*'],
});

export default PostgresDataSource;
