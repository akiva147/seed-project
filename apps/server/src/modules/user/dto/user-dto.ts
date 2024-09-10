import { Document } from 'mongodb';
import { createZodDto } from 'nestjs-zod';
type User = any;
export type UserDocument = User & Document;

// export class UserDto extends createZodDto(UserSchema) {}

// export class UserPayloadDto extends createZodDto(UserSchemaPayload) {}
