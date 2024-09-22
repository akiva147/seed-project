import {
  Body,
  Controller,
  Get,
  Headers,
  InternalServerErrorException,
  Post,
  Request,
} from '@nestjs/common';
import { Role, Roles } from '../../decorators/roles.decorator.js';
import { Request as Req } from '../../types/express.type.js';
import { UserService } from './user.service.js';
import { UserPayloadDto } from './dto/user-dto.js';
import { Public } from '../../decorators/publicRoute.decorator.js';

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
    return await this.userService.create(user);
  }
}
