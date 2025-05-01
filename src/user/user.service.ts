import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { omit } from 'lodash';
import { Repository } from 'typeorm';
import { User, UserWithoutPassword } from './user.entity';
import CreateUser from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

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
    const user = await this.userRepository.findOneBy({
      userName,
    });

    if (user === null || raw) {
      return user;
    }

    return omit(user, 'password');
  }

  public async create(userDto: CreateUser): Promise<UserWithoutPassword> {
    const user = new User();
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.userName = userDto.userName;
    user.password = userDto.password;

    const createdUser = await this.userRepository.save(user);

    return omit(createdUser, 'password');
  }
}
