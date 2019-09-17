import { Controller, Post, UseInterceptors, Body, UploadedFile } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { IUsers } from '../models/users.interface';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(
    private readonly userService: UsersService,
    private readonly sessionService: SessionService){}

  @Post('/login')
  async login(@Body() user: any) {
    const { email, password } = user;
    return await this.sessionService.login(email, password);
  }

  @Post('/register')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: path.resolve(__dirname, '..', '..', 'uploads'),
      filename: (req, file, cb) => {
        const randomName = Array(32)
        .fill(null)
        .map(() => (Math.round(Math.random() * 16))
        .toString(16))
        .join('')
        return cb(null, `${randomName}${file.originalname}`)
      }
    }),
  }))
  async register(@Body() users: IUsers, @UploadedFile() file: IUsers) {
    return await this.userService.create(users, file);
  }
}
