import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { _GenericService } from 'src/shared/adapter/service/_generic.service'
import { FindOptionsWhere } from 'typeorm'

@ApiTags('entities')
export abstract class _GenericController<Entity extends { id: number }, RequestDto, ResponseDto> {
  constructor(protected readonly service: _GenericService<Entity, RequestDto, ResponseDto>) {}

  @ApiOperation({ summary: 'Create a new entity' })
  @Post()
  async create(@Body() dto: RequestDto): Promise<ResponseDto> {
    return this.service.create(dto)
  }

  @ApiOperation({ summary: 'Retrieve all entities with pagination, filtering, and sorting' })
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortField') sortField: keyof Entity = 'id',
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
    @Query() filters: FindOptionsWhere<Entity>
  ): Promise<{ data: ResponseDto[]; count: number }> {
    return this.service.findAll(page, limit, sortField, sortOrder, filters)
  }

  @ApiOperation({ summary: 'Retrieve a single entity by ID' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseDto> {
    return this.service.findOne(+id)
  }

  @ApiOperation({ summary: 'Update an existing entity by ID' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: RequestDto): Promise<ResponseDto> {
    return this.service.update(+id, dto)
  }

  @ApiOperation({ summary: 'Delete an entity by ID' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(+id)
  }
}
