import { Controller, Get, Injectable } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Ping')
@Controller('ping')
@Injectable()
export class PingController {
  /**
   * Endpoint to check the health status of the service.
   *
   * @returns A confirmation message indicating the service is operational.
   */
  @Get()
  @ApiOperation({ summary: 'Check service health status' })
  @ApiResponse({ status: 200, description: 'Service is operational.' })
  async ping(): Promise<string> {
    return `It's working!!! :)`
  }
}
