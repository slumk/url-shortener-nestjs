import { Injectable } from '@nestjs/common';
import { SessionDomain } from './domain/session.domain';
import { SessionRepository } from './session.repository';
import DateHelpers from 'utils/DateHelpers';

@Injectable()
export class SessionService {
  constructor(readonly sessionRepository: SessionRepository) {}

  private JWT_EXPIRY_TIME = process.env.JWT_EXPIRES as string;

  async findOne(sessionId: string) {
    return await this.sessionRepository.findSessionById(sessionId);
  }

  async findSessionsByAccount(accountId: string): Promise<SessionDomain[]> {
    return await this.sessionRepository.findSessionsByAccountId(accountId);
  }

  async createSession(accountId: string) {
    let expiryMinutes = Number(this.JWT_EXPIRY_TIME.split('m')[0]);
    const expiresAt = DateHelpers.addMinutesToDate(expiryMinutes);
    const createdSession = await this.sessionRepository.createSession(
      accountId,
      expiresAt,
    );
    return createdSession.id;
  }

  async deleteSession(sessionId: string): Promise<void> {
    return await this.sessionRepository.deleteSession(sessionId);
  }

  async deleteAllUserSessions(accountId: string): Promise<void> {
    return await this.sessionRepository.deleteAllUserSessions(accountId);
  }
}
