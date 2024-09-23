import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Request,
} from '@nestjs/common';
import { Request as Req } from '../../types/express.type.js';
import { UserService } from './user.service.js';
import { UserPayloadDto } from './dto/user-dto.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async findSelf(@Request() { user }: Req) {
    if (!user) throw new InternalServerErrorException();
    return user;
  }

  // accessible only from localhost
  // @Roles('admin')
  @Post()
  async create(@Body() user: UserPayloadDto) {
    const res = await this.userService.create(user);
    if (!res.acknowledged) throw new Error('Error creating user');
    return 'User created sucessfully';
  }
}
