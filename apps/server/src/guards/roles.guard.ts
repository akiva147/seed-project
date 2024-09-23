import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/publicRoute.decorator.js';
import { ROLES_KEY } from '../decorators/roles.decorator.js';
import { Roles } from '@seed-project/models';
import { Request } from '../types/express.type.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    if (this.devMode()) {
      return true;
    }

    const publicRoute = this.isPublic(context);
    if (publicRoute) return true;

    const classScope = context.getClass();
    const handlerScope = context.getHandler();

    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      handlerScope,
      classScope,
    ]);

    if (!requiredRoles) {
      return true;
    }

    const req: Request = context.switchToHttp().getRequest();

    const { user } = req;

    if (!user) throw new BadRequestException('user is undefined');

    const allowed = requiredRoles.some((role) => user.role === role);
    if (!allowed) return false;

    return true;
  }

  private devMode() {
    if (
      process.env
        .VERY_DANGEROUS_CHECK_DO_NOT_USE_THIS_ITS_FOR_TESTING_ONLY_BE_CAREFUL_PLEASE ===
      'development'
    ) {
      return true;
    }
    return false;
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
