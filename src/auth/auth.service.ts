/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { RegisterDto } from './dto/register.dto';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/common/enums/roles.enum';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(payload: RegisterDto) {
    const { email, password, username, role = 'user' } = payload;

    const existUser = await this.usersRepo.findOne({ where: { email } });
    if (existUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User entity instance
    const user = this.usersRepo.create({
      username,
      email,
      password: hashedPassword,
      role: role as Role,
    });

    const savedUser = await this.usersRepo.save(user);

    // Exclude password from the response
    const { password: _, ...userWithoutPassword } = savedUser;

    return userWithoutPassword;
  }

  async loginUser(paylad: LoginDto) {
    const { email, password } = paylad;
    const existUser = await this.usersRepo.findOne({ where: { email } });
    if (!existUser) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const isMatchPassword = await bcrypt.compare(password, existUser.password);
    if (!isMatchPassword) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const jwtPayload = {
      id: existUser.id,
      role: existUser.role,
    };

    const token = this.jwtService.sign(jwtPayload);

    return { token };
  }
}
