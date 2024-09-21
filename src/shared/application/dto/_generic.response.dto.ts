import { ApiProperty } from '@nestjs/swagger'

export abstract class _GenericResponseDto {
  @ApiProperty({ description: 'The unique ID of the entity' })
  id: number

  @ApiProperty({ description: 'The date the entity was created' })
  createdAt: Date

  @ApiProperty({ description: 'The date the entity was last updated' })
  updatedAt: Date
}
