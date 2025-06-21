import { Module } from '@nestjs/common';
import { DatabaseModule } from 'utils/db/db.module';
import { LoggerModule } from 'utils/logger/logger.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
import { ConfigModule } from '@nestjs/config';
import { UrlsModule } from './urls/urls.module';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    DatabaseModule,
    LoggerModule,
    UsersModule,
    SessionModule,
    AuthModule,
    UrlsModule
  ],
})
export class AppModule {}
