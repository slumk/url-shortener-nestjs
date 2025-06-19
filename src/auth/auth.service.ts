import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { SessionService } from '../session/session.service';

import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import ErrorMessages from './constants/error_messages.json';
import { JWTPayload, LoginDto, LoginResponseTypeDTO } from './dto/user.dto';
import { PasswordService } from 'utils/passwords.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async validateLogin(loginDto: LoginDto): Promise<LoginResponseTypeDTO> {
    try {
      const account = await this.userService.findOneByEmail(loginDto.email);
      if (!account)
        throw new BadRequestException(ErrorMessages.invalidCredentials);

      const isValidPassword = await this.passwordService.comparePasswords(
        loginDto.password,
        account.password,
      );
      if (!isValidPassword)
        throw new BadRequestException(ErrorMessages.invalidCredentials);
      const createdSessionId = await this.sessionService.createSession(
        account.id,
      );
      return {
        token: this.jwtService.sign({
          userId: account.id,
          timestamp: new Date().toString(),
          sessionId: createdSessionId,
        }),
        userData: {
          id: account.id,
          email: account.email,
          timestamp: new Date()
        },
      };
    } catch (error) {
      throw new BadRequestException(
        error.message ?? ErrorMessages.invalidCredentials,
      );
    }
  }

  async logout(accountId: string) {
    return await this.sessionService.deleteAllUserSessions(accountId);
  }

  getToken(token: string) {
    return token.split('Bearer ')[1];
  }

  async getJWTPayload<T extends object = JWTPayload>(jwt: string) {
    return await this.jwtService.verifyAsync<T>(jwt, {
      secret: process.env.JWT_SECRET
    });
  }
}
