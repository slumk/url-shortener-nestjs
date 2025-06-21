import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import DatabaseService from 'utils/db/db.service';
import { RedisService } from 'utils/redis/redis.service';

@Injectable()
export class UrlsRepository {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly redisService: RedisService,
  ) {}

  private async cacheURLMapping(ogURL: string, mappedTail: string) {
    await this.redisService.insertValue(mappedTail, ogURL);
  }

  async insert(params: Prisma.URLMappingsUncheckedCreateInput) {
    await this.cacheURLMapping(params.ogURL, params.mappedTail);
    return await this.dbService.uRLMappings.create({ data: params });
  }

  async update(id: string, params: Prisma.URLMappingsUpdateInput) {
    if (params.ogURL && params.mappedTail) {
      await this.cacheURLMapping(
        params.ogURL as string,
        params.mappedTail as string,
      );
    }
    return await this.dbService.uRLMappings.update({
      where: { id },
      data: params,
    });
  }

  async updateOne(where: Prisma.URLMappingsWhereInput, params: Prisma.URLMappingsUpdateInput){
    return await this.dbService.uRLMappings.updateMany({
      where, data: params
    })
  }

  async delete(id: string) {
    const deleted = await this.dbService.uRLMappings.delete({ where: { id } });
    await this.redisService.removeStringValue(deleted.mappedTail);
    return deleted;
  }

  async find(where: Prisma.URLMappingsWhereInput, limit: number, skip: number) {
    return await this.dbService.uRLMappings.findMany({
      where,
      take: limit,
      skip,
    });
  }

  async findOne(where: Prisma.URLMappingsWhereInput) {
    return await this.dbService.uRLMappings.findFirst({ where });
  }

  async findByTail(tail: string) {
    let foundInCache = await this.redisService.getByKey(tail);
    if (foundInCache) return foundInCache;
    const found = await this.dbService.uRLMappings.findFirstOrThrow({
      where: { mappedTail: tail },
    });
    await this.cacheURLMapping(found.ogURL, found.mappedTail)
    return found.ogURL;
  }
}
