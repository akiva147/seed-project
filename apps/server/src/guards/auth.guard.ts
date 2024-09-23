import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../decorators/publicRoute.decorator.js';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserService } from '../modules/user/user.service.js';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { validateEnvs } from '../utils/env.util.js';
import { GoogleUserTokenSchema } from '@seed-project/models';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(UserService) private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.verify(token);
      const user = await this.userService.findOne(payload);
      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  private async verify(token: string) {
    const { GOOGLE_CLIENT_ID } = validateEnvs();

    const client = new OAuth2Client();
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const res = ticket.getPayload();
      if (!res) throw new UnauthorizedException();

      const payload = GoogleUserTokenSchema.parse(res);

      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
