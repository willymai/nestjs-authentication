import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
// import { UserRepository } from './user.repository';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  providers: [UserService, ConfigModule],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
