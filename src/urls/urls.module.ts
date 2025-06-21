import { Module } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { UrlsController } from './urls.controller';
import { UrlsRepository } from './urls.repository';

@Module({
  controllers: [UrlsController],
  providers: [UrlsService, UrlsRepository],
  exports: [UrlsService]
})
export class UrlsModule {}
