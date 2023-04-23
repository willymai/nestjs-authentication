import { Injectable } from '@nestjs/common';
import userRepository from './user.repository';
import { User } from './user.entity';
import { IRegisterRequest } from './user.interface';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  async createUser(data: IRegisterRequest): Promise<User> {
    data.password = await hash(data.password, 12);
    return await userRepository.createUser(data);
  }

  async findByEmail(email: string): Promise<User> {
    return await userRepository.findByEmail(email);
  }

  async findByUsername(username: string): Promise<User> {
    return await userRepository.findByUsername(username);
  }
}
