import { Module } from '@nestjs/common'
import { PingController } from './controller/ping.controller'
@Module({
  imports: [],
  controllers: [PingController],
  providers: [],
})
export class AppModule {}
