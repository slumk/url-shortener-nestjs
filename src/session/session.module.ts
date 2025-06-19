import { Global, Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionRepository } from './session.repository';
import { DatabaseModule } from 'utils/db/db.module';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [
    SessionService,
    SessionRepository
  ],
  exports: [SessionService],
})
export class SessionModule {}
