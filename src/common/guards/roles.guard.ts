import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../enums/roles.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get the roles required for this route from metadata
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]); //get the role that have access the route
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest(); //get current user

    if (!user) {
      // user not logged in
      throw new UnauthorizedException(
        'You are not logged in. Please log in first.',
      );
    }
    if (!requiredRoles.includes(user.role)) {
      // user role not allowed
      throw new ForbiddenException(
        'Your role is not allowed to perform this action.',
      );
    }

    return true; // access granted
  }
}
