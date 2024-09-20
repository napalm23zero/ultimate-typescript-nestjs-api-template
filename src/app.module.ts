import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core/constants'
import { Reflector } from '@nestjs/core/services/reflector.service'
import { ThrottlerModule, ThrottlerStorageService } from '@nestjs/throttler'
import { CommonModule } from 'src/common/common.module'
import { CustomThrottlerGuard, rateLimitConfig } from 'src/config/rate-limit.config'
@Module({
  imports: [
    // Load environment variables from the .env file or environment
    ConfigModule.forRoot({ isGlobal: true }),
    // Configure Throttler (Rate Limiting) using throttlerConfig
    ThrottlerModule.forRootAsync({ inject: [ConfigService], useFactory: rateLimitConfig }),
    // Import custom modules
    CommonModule,
  ],
  controllers: [],
  providers: [
    // ThrottlerStorageService is required for CustomThrottlerGuard
    ThrottlerStorageService,
    Reflector,
    { provide: APP_GUARD, useClass: CustomThrottlerGuard },
  ],
})
export class AppModule {}
