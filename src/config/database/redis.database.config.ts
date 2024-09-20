import { ConfigService } from '@nestjs/config'
import Redis, { RedisOptions } from 'ioredis'

/**
 * Generates Redis configuration options using the ConfigService.
 *
 * @param configService - The ConfigService instance to retrieve configuration variables.
 * @returns The RedisOptions for establishing a connection.
 */
export const redisConfig = (configService: ConfigService): RedisOptions => ({
  // Retrieve the Redis host from environment variables.
  host: configService.get<string>('REDIS_HOST', 'localhost'),
  // Retrieve the Redis port, or stick with the default 6379 if no one bothered to change it.
  port: configService.get<number>('REDIS_PORT', 6379),
  // Retrieve the Redis password. If it's empty, we trust that security through obscurity is your strategy.
  password: configService.get<string>('REDIS_PASSWORD', ''),
  // Select the Redis database index. Defaults to 0, because starting counts from 1 is for amateurs.
  db: configService.get<number>('REDIS_DATABASE', 0),
})

/**
 * Establishes a connection to the Redis database.
 *
 * @param configService - The ConfigService instance to retrieve configuration variables.
 * @returns The connected Redis client instance.
 */
export function connectRedisDatabase(configService: ConfigService): Redis {
  // Obtain Redis configuration options from our reliable ConfigService.
  const redisOptions = redisConfig(configService)

  // Initialize a new Redis client with the provided options.
  // Connecting to Redis faster than you can say "asynchronous".
  const redisConnection = new Redis(redisOptions)
  console.log('Redis connected successfully! 🚀')

  return redisConnection
}
