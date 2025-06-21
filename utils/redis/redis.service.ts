import { Injectable, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { Logger } from 'utils/logger/logger.service';

@Injectable()
export class RedisService implements OnModuleInit {

  constructor(
    private readonly logger: Logger
  ){}

  private REDIS_HOST = process.env.REDIS_HOST as string
  private REDIS_PORT = Number(process.env.REDIS_PORT) as number

  private client: Redis

  async onModuleInit() {
    this.client = new Redis({
      host: this.REDIS_HOST,
      port: this.REDIS_PORT
    })
    this.client.on('connect', () => this.logger.log("Connected to redis server"))
    this.client.on('error', () => this.logger.error("Redis connection errored"))
  }

  async insertValue(key: string, value: string, ttl: number = 60 * 24 * 30){
    await this.client.set(key, value)
    await this.client.expire(key, ttl)
  }

  async getByKey(key: string){
    return await this.client.get(key)
  }

  async removeStringValue(key: string){
    return await this.client.del(key)
  }
}
