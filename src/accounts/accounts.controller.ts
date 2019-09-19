import { Controller, Get, Post, Body, Param, Put, Delete, Req } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { IAccounts } from 'src/models/accounts.interface';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService){}

  @Get()
  async find() {
    return await this.accountService.findAll();
  }

  @Post()
  async store(@Body() accounts: IAccounts, @Req() req: any) {
    return await this.accountService.store(accounts, req);
  }

  @Get('/:id')
  async show(@Param() id: number) {
    return await this.accountService.show(id);
  }

  @Put('/:id')
  async update(@Param() id: number, @Body() account: IAccounts, @Req() req: any) {
    return await this.accountService.update(account, id, req);
  }

  @Delete('/:id')
  async delete(@Param() id: number) {
    return await this.accountService.destroy(id);
  }
}
