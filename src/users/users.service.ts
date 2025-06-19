import { Injectable, OnModuleInit } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { PasswordService } from 'utils/passwords.service';

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly passwordService: PasswordService
  ) {}

  static readonly ADMIN_ACCOUNT_EMAIL = 'admin@shortener.com'
  static readonly ADMIN_ACCOUNT_PASSWORD = 'admin123'

  async onModuleInit() {
    const existing = await this.findOneByEmail(UserService.ADMIN_ACCOUNT_EMAIL)
    const hashedPassword = await this.passwordService.hashPassword(UserService.ADMIN_ACCOUNT_PASSWORD)
    if (existing) {
      return await this.userRepo.update(existing.id, { password: hashedPassword })
    }
    return await this.userRepo.insert({
      email: UserService.ADMIN_ACCOUNT_EMAIL,
      password: hashedPassword
    })
  }

  async findOneByEmail(email: string) {
    return await this.userRepo.findOne({ email });
  }

  async findById(id: string){
    return await this.userRepo.findOne({ id })
  }

  async updateAccount(id: string, updateData: Partial<{ email: string; name: string; password: string }>) {
    return await this.userRepo.update(id, updateData);
  }
}
