import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';
import { IRegisterRequest } from './user.interface';
import PostgresDataSource from 'typeOrm.config';

const userRepository = PostgresDataSource.getRepository(User).extend({
  async createUser({
    username,
    password,
    email,
  }: IRegisterRequest): Promise<User> {
    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;
    return await this.save(user);
  },

  async findByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } }).then((entity) => {
      if (!entity) {
        return Promise.reject(new NotFoundException('Model not found'));
      }
      return Promise.resolve(entity);
    });
  },

  async findByUsername(username: string): Promise<User> {
    return this.findOne({ where: { username } }).then((entity) => {
      if (!entity) {
        return Promise.reject(new NotFoundException('Model not found'));
      }

      return Promise.resolve(entity);
    });
  },
});

export default userRepository;
