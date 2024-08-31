import { Inject } from '@nestjs/common';

export const InjectDB = () => Inject('DATABASE_CONNECTION');
