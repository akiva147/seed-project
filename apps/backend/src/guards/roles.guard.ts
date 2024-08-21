import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/publicRoute.decorator.js';
import { Role, ROLES_KEY } from '../decorators/roles.decorator.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const publicRoute = this.isPublic(context);
    if (publicRoute) return true;

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles[0] === Role.AllAuthenticated) {
      return true;
    }

    const req: Request = context.switchToHttp().getRequest();
    const { user }: any = req;

    const allowed = requiredRoles.some((role) => user.role.type === role);
    if (!allowed) return false;

    return true;
  }

  private isPublic(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    return false;
  }
}
