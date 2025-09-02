import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
  //nestjs is being told, inject repository of User entity in this service
  //Repository<User> is a TypeORM repository that provides built-in methods to interact with the User entity’s table in the database.
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getAllUser() {
    return await this.usersRepository.find();
  }

  async getUserById(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async updateUser(id: number, updatedUserInfo: Partial<RegisterDto>) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, updatedUserInfo);
    return await this.usersRepository.save(user);
  }

  async deleteUser(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.delete(id);

    return { message: 'User deleted successfully' };
  }
}
