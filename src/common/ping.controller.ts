import { Controller, Get, Injectable } from '@nestjs/common'

@Controller('ping')
@Injectable()
export class PingController {
  @Get()
  async ping(): Promise<string> {
    return 'That works!'
  }
}
