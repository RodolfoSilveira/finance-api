import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../models/users.entity';
import { SessionService } from './session.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    UsersModule
  ],
  providers: [UsersService, SessionService],
  controllers: [SessionController]
})
export class SessionModule {}
