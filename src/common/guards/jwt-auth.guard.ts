import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
//JwtAuthGuard is a guard that checks the JWT token and adds the user to request.user so protected routes can be accessed.
export class JwtAuthGuard extends AuthGuard('jwt') {}
