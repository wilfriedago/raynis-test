import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  findAll() {
    const users = this.repository.find();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.then((users) => users.map(({ password, ...user }) => user));
  }

  async findOne(options: FindOneOptions<User>) {
    const user = await this.repository.findOne(options);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { affected } = await this.repository.update(id, updateUserDto);

    if (!affected) {
      throw new HttpException(
        'The user you are trying to update does not exist',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.findOne({ where: { id } });
  }

  async remove(id: string) {
    const { affected } = await this.repository.delete(id);

    if (!affected) {
      throw new HttpException(
        'The user you are trying to delete does not exist',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
