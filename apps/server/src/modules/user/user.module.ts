import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller.js';
import { UserService } from './user.service.js';

@Module({
  imports: [HttpModule.register({ timeout: 5000, maxRedirects: 5 })],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
