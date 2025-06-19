import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import DatabaseService from 'utils/db/db.service';

@Injectable()
export class UserRepository {
    constructor(private readonly dbService: DatabaseService) {}

    async findOne(params: Prisma.UsersWhereUniqueInput){
        return await this.dbService.users.findFirst({ where: params })
    }

    async update(id: string, data: Prisma.UsersUpdateInput) {
        return await this.dbService.users.update({
            where: { id },
            data,
        });
    }

    async insert(data: Prisma.UsersCreateInput){
        return await this.dbService.users.create({ data })
    }
}