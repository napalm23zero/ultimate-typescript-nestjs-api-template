import { Module } from '@nestjs/common'
import { PingController } from 'src/common/adapter/controller/ping.controller'

@Module({
  imports: [],
  controllers: [PingController],
  providers: [],
})
export class CommonModule {}
