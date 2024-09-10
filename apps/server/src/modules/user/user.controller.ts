import { Controller, Get, Headers } from '@nestjs/common';
import { Role, Roles } from '../../decorators/roles.decorator.js';
import { UserService } from './user.service.js';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.AllAuthenticated)
  @Get('/me')
  async findSelf(@Headers('authorization') token: string) {
    return await this.userService.getSelf(token);
  }
}
