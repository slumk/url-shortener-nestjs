import { Injectable, Ip, NotFoundException } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UrlsRepository } from './urls.repository';
import { StringHelper } from 'utils/string.helper';
import { ListURLParams } from './dto/list-url.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UrlsService {
  constructor(private readonly urlRepo: UrlsRepository) {}

  async create(createUrlDto: CreateUrlDto, userId: string) {
    if (!createUrlDto.customTail) {
      createUrlDto.customTail = StringHelper.generateMixedCaseString(7);
    }
    const createdURLMapping = await this.urlRepo.insert({
      mappedTail: createUrlDto.customTail,
      ogURL: createUrlDto.ogURL,
      userId,
    });
    return { id: createdURLMapping.id };
  }

  async list(params: ListURLParams) {
    const whereQuery: Prisma.URLMappingsWhereInput = {};
    if (params.searchText) {
      whereQuery.OR = [
        { mappedTail: { contains: params.searchText } },
        { ogURL: { contains: params.searchText } },
      ];
    }
    return await this.urlRepo.find(whereQuery, params.limit, params.skip);
  }

  async update(id: string, updateUrlDto: UpdateUrlDto) {
    await this.urlRepo.update(id, updateUrlDto);
    return { updated: true };
  }

  private async recordURLHit(mappedTail: string, ip_address: string) {
    await this.urlRepo.updateOne(
      { mappedTail },
      {
        hitCount: { increment: 1 },
        hits: {
          create: {
            ip_address
          }
        }
      },
    );
  }

  async checkShortenedURL(path: string, ip_address: string) {
    const ogURL = await this.urlRepo.findByTail(path);
    if (!ogURL) throw new NotFoundException();
    this.recordURLHit(path, ip_address)
    return ogURL;
  }

  async remove(id: string) {
    await this.urlRepo.delete(id);
    return { deleted: true };
  }
}
