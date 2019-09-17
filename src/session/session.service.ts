import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../models/users.entity';
import { Repository } from 'typeorm';
import { IUsers } from '../models/users.interface';

function generateToken (params = {}): string {
  return jwt.sign(params, process.env.JWT_SECRET, {
    expiresIn: 86400
  })
}

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<IUsers>
  ){}

  async login(email: string, password: string): Promise<any> {
    try {
      const user = await this.userRepository.findOne({ where: [{email}]});

      if (!user) {
        throw new UnauthorizedException();
      }

      if (!await bcrypt.compare(password, user.password)) {
        throw new UnauthorizedException();
      }

      user.password = undefined

      return { user, token: generateToken({ id: user.id }) }
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
