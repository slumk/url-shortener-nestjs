import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import DatabaseService from 'utils/db/db.service';

@Injectable()
export class UrlsRepository {
  constructor(private readonly dbService: DatabaseService) {}

  async insert(params: Prisma.URLMappingsUncheckedCreateInput){
    return await this.dbService.uRLMappings.create({ data: params })
  }

  async update(id: string, params: Prisma.URLMappingsUpdateInput){
    return await this.dbService.uRLMappings.update({
      where: { id },
      data: params
    })
  }

  async delete(id: string){
    return await this.dbService.uRLMappings.delete({ where: { id } })
  }

  async find(where: Prisma.URLMappingsWhereInput, limit: number, skip: number) {
    return await this.dbService.uRLMappings.findMany({ where, take: limit, skip })
  }

  async findOne(where: Prisma.URLMappingsWhereInput){
    return await this.dbService.uRLMappings.findFirst({ where })
  }
}
