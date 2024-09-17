import { ConfigService } from '@nestjs/config'
import Redis, { RedisOptions } from 'ioredis'

/**
 * Redis Configuration Factory.
 * We use this to configure our Redis instance for caching, rate-limiting, and other ephemeral data operations.
 */
export const redisConfig = (configService: ConfigService): RedisOptions => ({
  host: configService.get<string>('REDIS_HOST', 'localhost'),
  port: configService.get<number>('REDIS_PORT', 6379),
  password: configService.get<string>('REDIS_PASSWORD', ''),
  db: configService.get<number>('REDIS_DATABASE', 0),
})

/**
 * Redis Client Creator.
 * This sets up a Redis client with the configuration provided by ConfigService.
 */
export function connectRedisDatabase(configService: ConfigService): Redis {
  const redisOptions = redisConfig(configService)

  // Initialize the Redis connection
  const redisConnection = new Redis(redisOptions)
  console.log('Redis connected successfully! 🚀')
  return redisConnection
}
