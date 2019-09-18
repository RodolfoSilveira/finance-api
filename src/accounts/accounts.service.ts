import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Accounts } from '../models/accounts.entity';
import { Repository } from 'typeorm';
import { IAccounts } from '../models/accounts.interface';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private readonly accountRepository: Repository<IAccounts>
  ){}

  async findAll(): Promise<IAccounts[]> {
    try {
      return await this.accountRepository.find();
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async store(account: IAccounts): Promise<IAccounts> {
    try {
      return await this.accountRepository.save(account);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async show(id: number): Promise<IAccounts> {
    try {
      return await this.accountRepository.findOneOrFail(id);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async update(account: IAccounts, id: number): Promise<any> {
    try {
      return await this.accountRepository.update(id, account);
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
