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
  async registerUser(paylad: RegisterDto) {
    const { email, password, username, role = 'user' } = paylad;
    const existUser = await this.usersRepo.findOne({ where: { email } });
    if (existUser) {
      throw new UnauthorizedException('Email is already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userInfo = {
      username,
      email,
      password: hashedPassword,
      role: role as Role,
    };
    return this.usersRepo.save(userInfo);
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
