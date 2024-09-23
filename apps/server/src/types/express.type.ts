import { Request as ExpressRequest } from 'express';
import { User } from '@seed-project/models';

export interface Request extends ExpressRequest {
  user?: User;
}
