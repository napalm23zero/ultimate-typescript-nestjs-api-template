import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PingController } from './controller/ping.controller'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [PingController],
  providers: [],
})
export class AppModule {}
