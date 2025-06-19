import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { SessionService } from 'src/session/session.service';
import { UserService } from 'src/users/users.service';
import { AuthService } from '../auth.service';

import { RequestWithUser } from '../types/request_with_user';
import { ApiBearerAuth } from '@nestjs/swagger';

@Injectable()
class AuthGuard implements CanActivate {
  constructor(
    private sessionService: SessionService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const tokenFromHeader = request.headers.authorization;
    if (!tokenFromHeader) throw new UnauthorizedException();

    const token = this.authService.getToken(tokenFromHeader);
    if (!token) throw new UnauthorizedException();
    
    try {
      const payload = await this.authService.getJWTPayload(token);
      const validSession = await this.sessionService.findOne(payload.sessionId);

      if (!validSession) throw new UnauthorizedException();
      const userDetails = await this.userService.findById(
        validSession.userId,
      );
      if (!userDetails) throw new UnauthorizedException();
      request.user = userDetails;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}

export function ProtectRoute(){
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiBearerAuth('JWT')
  )
}
