import { Request as ExpressRequest } from 'express';
import { GoogleUser } from './auth.type.js';
import { User } from '@seed-project/models';

export interface Request extends ExpressRequest {
  user?: User;
}
