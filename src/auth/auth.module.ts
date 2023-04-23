import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthService } from './auth.service';
// import { UserController } from '../user/user.controller';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
// import { UserRepository } from 'src/user/user.repository';
// import { TypeOrmModule } from '@nestjs/typeorm';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    UserModule,
    PassportModule,
    // TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserService],
})
export class AuthModule {}
