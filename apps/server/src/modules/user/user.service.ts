import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Collection, Db } from 'mongodb';
import { InjectDB } from '../../database/injectDatabase.decorator.js';
import { UserDocument } from './dto/user-dto.js';
import jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

export type User = any;

@Injectable()
export class UserService {
  private userModel: Collection<UserDocument>;
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];
  constructor(
    @InjectDB() private readonly db: Db,
    private jwtService: JwtService,
  ) {
    this.userModel = this.db.collection('users');
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async create(user: any) {
    try {
      await this.userModel.insertOne({
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        organization: user.organization,
        role: user.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return 'User created sucessfully';
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getSelf(token: string) {
    // const userData = jwt.
    try {
      // return await this.userModel.findOne({ _id });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getRole(_id: string) {
    const user = await this.userModel.findOne({ _id });
    if (!user?.role && !user?.organization)
      throw new InternalServerErrorException();
    return {
      role: user.role,
      organization: user.organization,
    };
  }
}
