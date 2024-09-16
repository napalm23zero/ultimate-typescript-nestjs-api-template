import { Controller, Get, Injectable } from '@nestjs/common'

@Controller('ping')
@Injectable()
export class PingController {
  @Get()
  async ping() {
    return 'That works!'
  }
}
