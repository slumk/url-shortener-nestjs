import { Module } from '@nestjs/common';
import { DatabaseModule } from 'utils/db/db.module';
import { LoggerModule } from 'utils/logger/logger.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      serveStaticOptions: {
        index: false
      },
      rootPath: join(__dirname, '..', '..', 'uploads')
    }),
    DatabaseModule,
    LoggerModule,
    UsersModule,
    SessionModule,
    AuthModule
  ],
})
export class AppModule {}
