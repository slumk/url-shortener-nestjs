import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Global()
@Injectable()
class DatabaseService extends PrismaClient implements OnModuleInit {

  async onModuleInit() {
    await this.$connect()
  }
}

export default DatabaseService;
