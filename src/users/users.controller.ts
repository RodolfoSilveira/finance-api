import { Controller, Post, Body, UseInterceptors, UploadedFile, Get, Param, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { IUsers } from '../models/users.interface';
import { diskStorage } from  'multer';
import * as path from 'path';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService){}

  @Get()
  async find() {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async show(@Param() id: number) {
    return await this.userService.findOne(id);
  }

  @Post('/:id')
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
  async update(@Body() users: IUsers,
  @UploadedFile() file: IUsers,
  @Param() id: number) {
    return await this.userService.update(users, file,  id);
  }

  @Delete('/:id')
  async destroy(@Param() id: number) {
    return await this.userService.destroy(id);
  }
}
