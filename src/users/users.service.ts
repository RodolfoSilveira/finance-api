import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../models/users.entity';
import { Repository } from 'typeorm';
import { IUsers } from '../models/users.interface';
import * as sharp from 'sharp';
import * as path from 'path';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

function generateToken (params = {}): string {
  return jwt.sign(params, process.env.JWT_SECRET, {
    expiresIn: 86400
  })
}
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<IUsers>
  ){}

  async findAll(): Promise<IUsers[]> {
    try {
      return await this.userRepository.find();
    }catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async findOne(id: number): Promise<IUsers> {
    try {
      const users = await this.userRepository.findOneOrFail(id);
      users.password = undefined
      return users;
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async create(users: IUsers, file: any): Promise<any> {
    const { name, email, password } = users
    const { originalname } = file

    try {
      const randomName = Array(32)
      .fill(null)
      .map(() => (Math.round(Math.random() * 16))
      .toString(16))
      .join('')

      const fullName = `${randomName}${originalname}`

      await sharp(file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(
          path.resolve(file.destination, 'resized', fullName),
        );

      const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

      const user = {
        name,
        email,
        password: hash,
        avatar: fullName
      }

      const data = await this.userRepository.save(user);

      data.password = undefined;

      return {data, token: generateToken({ id: data.id })};
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(users: IUsers,  file: any, id: number): Promise<any> {
    const { name, email, password } = users
    const { originalname } = file
    try {
      const randomName = Array(32)
      .fill(null)
      .map(() => (Math.round(Math.random() * 16))
      .toString(16))
      .join('')

      const fullName = `${randomName}${originalname}`

      await sharp(file.path)
        .resize(500)
        .jpeg({ quality: 70 })
        .toFile(
          path.resolve(file.destination, 'resized', fullName),
        );

      const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

      const user = {
        name,
        email,
        password: hash,
        avatar: fullName
      }

      return await this.userRepository.update(id, user);
    } catch (err) {
      throw new InternalServerErrorException(err.message)
    }
  }

  async destroy(id: number) {
    try {
      return await this.userRepository.delete(id);
    } catch(err) {
      throw new InternalServerErrorException(err.message)
    }
  }
}

