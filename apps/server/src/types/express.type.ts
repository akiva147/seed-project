import { Request as ExpressRequest } from 'express';
import { User } from './auth.type.js';

export interface Request extends ExpressRequest {
  user?: User;
}
