import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export enum Role {
  Admin = 'admin',
  AllAuthenticated = 'all',
}

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
