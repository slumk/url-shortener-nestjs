import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { DatabaseModule } from 'utils/db/db.module';
import { PasswordService } from 'utils/passwords.service';

@Global()
@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [AuthController],
  providers: [Logger, AuthService, JwtStrategy, PasswordService],
  exports: [AuthService],
})
export class AuthModule {}
