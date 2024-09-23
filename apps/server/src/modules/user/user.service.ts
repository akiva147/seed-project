import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Collection, Db } from 'mongodb';
import { InjectDB } from '../../database/injectDatabase.decorator.js';
import { UserDocument, UserPayloadDto } from './dto/user-dto.js';
import { GoogleUserToken, GoogleUserTokenSchema } from '@seed-project/models';

@Injectable()
export class UserService {
  private userModel: Collection<UserDocument>;
  constructor(@InjectDB() private readonly db: Db) {
    this.userModel = this.db.collection('users');
  }

  async findOne(payload: GoogleUserToken) {
    try {
      const googleUserToken = GoogleUserTokenSchema.parse(payload);
      const user = await this.userModel.findOne({
        googleId: googleUserToken.sub,
      });
      if (!user) {
        const res = await this.create({
          gmail: googleUserToken.email,
          googleId: googleUserToken.sub,
          name: googleUserToken.name,
          picture: googleUserToken.picture,
          role: 'Normal',
        });
        const newUser = await this.userModel.findOne({ _id: res.insertedId });
        return newUser;
      }
      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async create(user: UserPayloadDto) {
    try {
      const res = await this.userModel.insertOne({
        gmail: user.gmail,
        name: user.name,
        googleId: user.googleId,
        picture: user.picture,
        role: user.role,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
