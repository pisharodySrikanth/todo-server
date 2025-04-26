import { Injectable } from '@nestjs/common';
import wait from 'src/utils/wait';
import { User, UserWithoutPassword } from './user.entity';
import { omit } from 'lodash';

const users: User[] = [
  {
    id: 1,
    userName: 'srikanth',
    name: 'Srikanth',
    password: '$2b$10$yDsFmAZe0Jc/mQ4ZjdvQMO.pZDt11KLemWP7GJqlh9Jb1UHmG/Ce2 ',
  },
  {
    id: 2,
    userName: 'ramesh',
    name: 'Ramesh',
    password: 'password123',
  },
];

@Injectable()
export class UserService {
  public async findByUserName<T extends false>(
    userName: string,
    raw?: T,
  ): Promise<null | UserWithoutPassword>;
  public async findByUserName<T extends true>(
    userName: string,
    raw?: T,
  ): Promise<null | User>;
  public async findByUserName<T extends boolean>(
    userName: string,
    raw: T = false as T,
  ): Promise<unknown> {
    await wait(1000);
    const index = users.findIndex((user) => user.userName === userName);

    if (index === -1) {
      return null;
    }

    if (raw) {
      return users[index];
    }

    return omit(users[index], 'password');
  }

  public async create(user: Omit<User, 'id'>): Promise<UserWithoutPassword> {
    await wait(1000);
    const exists = users.some((u) => u.userName === user.userName);

    if (exists) {
      throw new Error('Username already exists');
    }

    const newUser = {
      ...user,
      id: users.length + 1,
    };

    users.push(newUser);

    return omit(newUser, 'password');
  }
}
