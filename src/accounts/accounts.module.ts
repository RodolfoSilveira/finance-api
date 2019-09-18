import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from '../models/accounts.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Accounts]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService]
})
export class AccountsModule {}
