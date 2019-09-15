import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AccountsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
