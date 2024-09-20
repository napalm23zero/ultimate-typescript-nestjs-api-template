/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import {
  ThrottlerException,
  ThrottlerGuard,
  ThrottlerModuleOptions,
  ThrottlerRequest,
  ThrottlerStorage,
} from '@nestjs/throttler'
import { connectRedisDatabase } from 'src/config/database/redis.database.config'

/**
 * Because we all need more interfaces in our lives.
 */
export interface ThrottlerStorageRecord {
  totalHits: number
  timeToExpire: number
  isBlocked: boolean
  timeToBlockExpire: number
}

/**
 * Configuring the throttler like it's the Millennium Falcon's hyperdrive.
 *
 * @param configService - Our trusty configuration provider.
 * @returns ThrottlerModuleOptions configured for our app.
 */
export const rateLimitConfig = (configService: ConfigService): ThrottlerModuleOptions => ({
  throttlers: [
    {
      limit: configService.get<number>('THROTTLE_LIMIT', 10),
      ttl: configService.get<number>('THROTTLE_TTL', 60),
      blockDuration: configService.get<number>('THROTTLE_BLOCK_DURATION', 60),
    },
  ],
  storage: new RedisThrottlerStorageService(configService),
})

/**
 * Our Redis-powered storage service, because local storage is so last decade.
 */
export class RedisThrottlerStorageService implements ThrottlerStorage {
  private redisClient

  constructor(configService: ConfigService) {
    // Initialize our trusty Redis client.
    this.redisClient = connectRedisDatabase(configService)
  }

  private async getExpirationAndBlockedStatus(
    key: string,
    ttl: number,
    limit: number
  ): Promise<{ totalHits: number; timeToExpire: number; isBlocked: boolean }> {
    // Increment the hit count for this key. Yay, more traffic!
    const totalHits = await this.redisClient.incr(key)

    // If this is the first hit, set the TTL. Welcome, newcomer!
    if (totalHits === 1) {
      await this.redisClient.expire(key, ttl)
    }

    // Find out when this key will expire and if the user should be blocked.
    const timeToExpire = await this.redisClient.ttl(key)
    const isBlocked = totalHits > limit

    return { totalHits, timeToExpire, isBlocked }
  }

  async increment(key: string, ttl: number, limit: number): Promise<ThrottlerStorageRecord> {
    const { totalHits, timeToExpire, isBlocked } = await this.getExpirationAndBlockedStatus(key, ttl, limit)

    return {
      totalHits,
      timeToExpire,
      isBlocked,
      // Time until the block expires, so the user can plan their next move.
      timeToBlockExpire: isBlocked ? timeToExpire : 0,
    }
  }

  async reset(key: string): Promise<void> {
    // Reset the hit count. Everyone deserves a second chance.
    await this.redisClient.del(key)
  }
}

/**
 * A custom ThrottlerGuard, because default settings are for mere mortals.
 */
export class CustomThrottlerGuard extends ThrottlerGuard {
  private readonly slowDownMessage: string

  constructor(
    protected readonly options: ThrottlerModuleOptions,
    protected readonly storageService: ThrottlerStorage,
    protected readonly reflector: Reflector
  ) {
    super(options, storageService, reflector)
    // Get the slow down message from environment variables, or use a default.
    this.slowDownMessage = process.env.THROTTLE_MESSAGE || 'Too many requests. Please slow down and try again later.'
  }

  private logHitInfo(clientIP: string, totalHits: number, ttl: number): void {
    // Log the user's relentless pursuit of server resources.
    console.log(`Client IP ${clientIP} has made ${totalHits} requests in the last ${ttl} seconds.`)
  }

  protected async handleRequest(requestProps: ThrottlerRequest): Promise<boolean> {
    try {
      const { limit, ttl, blockDuration } = requestProps
      const clientIP = await this.getTracker(requestProps)

      // Keep track of how eager our client is.
      const { totalHits } = await this.storageService.increment(clientIP, ttl, limit, blockDuration, 'default')

      this.logHitInfo(clientIP, totalHits, ttl)

      if (totalHits > limit) {
        // Gently inform the client that patience is a virtue.
        throw new ThrottlerException(this.slowDownMessage)
      }
      return true
    } catch (error) {
      // If something breaks, we log it—because logs are our best friends.
      console.error('Error in CustomThrottlerGuard:', error)
      throw error
    }
  }

  protected async getTracker(request: any): Promise<string> {
    // Extract the client's IP address. No stalking, we promise.
    return request.context.args[0].ip
  }
}
