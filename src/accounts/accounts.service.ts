import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from '../models/accounts.entity';
import { Repository } from 'typeorm';
import { IAccounts } from '../models/accounts.interface';
import { Request } from 'express';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private readonly accountRepository: Repository<IAccounts>
  ){}

  async findAll(): Promise<IAccounts[]> {
    try {
      return await this.accountRepository.find({ relations: ["user"] });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async store(account: IAccounts, req: any): Promise<IAccounts> {
    try {
      const {name, price, quantity} = account
      const data = {
        name,
        price,
        quantity,
        user: req.userId
      }
      return await this.accountRepository.save(data);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async show(id: number): Promise<IAccounts> {
    try {
      return await this.accountRepository.findOneOrFail(id, { relations: ["user"] });
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(account: IAccounts, id: number, req: any): Promise<any> {
    try {
      const {name, price, quantity} = account
      const data = {
        name,
        price,
        quantity,
        user: req.userId
      }
      return await this.accountRepository.update(id, data);
    } catch (err){
      throw new InternalServerErrorException(err.message);
    }
  }

  async destroy(id: number): Promise<any> {
    try {
      return await this.accountRepository.delete(id);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
