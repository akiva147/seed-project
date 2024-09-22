import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Collection, Db } from 'mongodb';
import { InjectDB } from '../../database/injectDatabase.decorator.js';
import { UserDocument, UserPayloadDto } from './dto/user-dto.js';
import { GoogleUser } from '../../types/auth.type.js';
import { GoogleUserTokenSchema } from '@seed-project/models';

@Injectable()
export class UserService {
  private userModel: Collection<UserDocument>;
  constructor(@InjectDB() private readonly db: Db) {
    this.userModel = this.db.collection('users');
  }

  async findOne(payload: GoogleUser) {
    try {
      const googleUserToken = GoogleUserTokenSchema.parse(payload);
      const user = await this.userModel.findOne({
        googleId: googleUserToken.sub,
      });
      if (!user) {
        const newUser = await this.create({
          gmail: googleUserToken.email,
          googleId: Number(googleUserToken.sub),
          name: googleUserToken.name,
          picture: googleUserToken.picture,
          role: 'Normal',
        });
        return newUser;
      }
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async create(user: UserPayloadDto) {
    try {
      await this.userModel.insertOne({
        gmail: user.gmail,
        name: user.name,
        googleId: user.googleId,
        picture: user.picture,
        role: user.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return 'User created sucessfully';
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
