import { Injectable } from '@nestjs/common';
import DatabaseService from 'utils/db/db.service';

@Injectable()
export class SessionRepository {
  constructor(private db: DatabaseService) {}

  async findSessionById(sessionId: string) {
    return await this.db.userSession.findFirst({ where: { id: sessionId } });
  }
  async findSessionsByAccountId(accountId: string) {
    return await this.db.userSession.findMany({
      where: { userId: accountId },
    });
  }
  async createSession(userId: string, expiresAt: Date) {
    const totalSessionCount = await this.db.userSession.count({
      where: { userId },
    });
    if (totalSessionCount === 5) {
      const oldestSession = await this.db.userSession.findFirst({
        take: 1,
        orderBy: { createdAt: 'asc' },
        where: { userId },
      });
      if (oldestSession)
        await this.db.userSession.delete({ where: { id: oldestSession.id } });
    }
    return await this.db.userSession.create({
      data: {
        userId,
        expiresAt,
      },
    });
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.db.userSession.delete({ where: { id: sessionId } });
    return;
  }

  async deleteAllUserSessions(accountId: string): Promise<void> {
    await this.db.userSession.deleteMany({
      where: {
        userId: accountId,
      },
    });
    return;
  }
}
