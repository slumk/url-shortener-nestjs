import { Global, Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserRepository } from './user.repository';
import { PasswordService } from 'utils/passwords.service';

@Global()
@Module({
    exports: [UserService],
    providers: [UserService, UserRepository, PasswordService]
})
export class UsersModule {}
