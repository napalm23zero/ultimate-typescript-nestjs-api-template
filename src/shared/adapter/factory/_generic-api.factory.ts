import { Body, Controller, Delete, Get, Inject, Injectable, Param, Post, Put, Query, Type } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { _GenericController } from 'src/shared/adapter/controller/_generic.controller'
import { _GenericService } from 'src/shared/adapter/service/_generic.service'
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'

export function _GenericApiFactory<Entity extends { id: number }, RequestDto, ResponseDto>(
  entityName: string,
  entityClass: Type<Entity>,
  requestDto: Type<RequestDto>,
  responseDto: Type<ResponseDto>,
  serviceClass: Type<_GenericService<Entity, RequestDto, ResponseDto>>
) {
  @ApiTags(entityName)
  @Controller(entityName)
  @Injectable()
  class GenericController extends _GenericController<Entity, RequestDto, ResponseDto> {
    constructor(
      @Inject(serviceClass)
      public readonly service: _GenericService<Entity, RequestDto, ResponseDto>
    ) {
      super(service)
    }

    @Post()
    @ApiOperation({ summary: `Create a new ${entityName}` })
    @ApiBody({ type: requestDto })
    @ApiResponse({
      status: 201,
      description: `${entityName} successfully created.`,
      type: responseDto,
    })
    async create(@Body() dto: RequestDto): Promise<ResponseDto> {
      return super.create(dto)
    }

    @Get()
    @ApiOperation({ summary: `Retrieve all ${entityName}` })
    @ApiResponse({
      status: 200,
      description: `List of all ${entityName}.`,
      type: [responseDto],
    })
    async findAll(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
      @Query('sortField') sortField: keyof Entity = 'id',
      @Query('sortOrder') sortOrder: 'ASC' | 'DESC' = 'ASC',
      @Query() filters: FindOptionsWhere<Entity>
    ): Promise<{ data: ResponseDto[]; count: number }> {
      // Pass the parameters to the base method
      return super.findAll(page, limit, sortField, sortOrder, filters)
    }

    @Get(':id')
    @ApiOperation({ summary: `Retrieve a single ${entityName} by ID` })
    @ApiResponse({
      status: 200,
      description: `${entityName} retrieved successfully.`,
      type: responseDto,
    })
    async findOne(@Param('id') id: string): Promise<ResponseDto> {
      return super.findOne(id)
    }

    @Put(':id')
    @ApiOperation({ summary: `Update an existing ${entityName} by ID` })
    @ApiBody({ type: requestDto })
    @ApiResponse({
      status: 200,
      description: `${entityName} updated successfully.`,
      type: responseDto,
    })
    async update(@Param('id') id: string, @Body() dto: RequestDto): Promise<ResponseDto> {
      return super.update(id, dto)
    }

    @Delete(':id')
    @ApiOperation({ summary: `Delete a ${entityName} by ID` })
    @ApiResponse({
      status: 204,
      description: `${entityName} deleted successfully.`,
    })
    async remove(@Param('id') id: string): Promise<void> {
      return super.remove(id)
    }
  }

  return GenericController
}
