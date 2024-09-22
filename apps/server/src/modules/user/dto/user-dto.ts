import { User, UserSchema, UserSchemaPayload } from '@seed-project/models';
import { Document } from 'mongodb';
import { createZodDto } from 'nestjs-zod';

export type UserDocument = Omit<User, '_id'> & Document;

export class UserDto extends createZodDto(UserSchema) {}

export class UserPayloadDto extends createZodDto(UserSchemaPayload) {}
