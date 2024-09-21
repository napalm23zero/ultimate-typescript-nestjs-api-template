import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { _GenericMapper } from 'src/shared/application/mapper/_generic.mapper'
import { _GenericValidator } from 'src/shared/application/validators/_generic-validator'
import { _GenericRepository } from 'src/shared/domain/repository/_generic.repository'
import { FindManyOptions, FindOptionsWhere } from 'typeorm'

@Injectable()
export abstract class _GenericService<Entity extends { id: number }, RequestDto, ResponseDto> {
  constructor(
    protected readonly repository: _GenericRepository<Entity>,
    protected readonly mapper: _GenericMapper<Entity, RequestDto, ResponseDto>,
    protected readonly validator?: _GenericValidator<RequestDto>
  ) {}

  // Create a shiny new entity. The world is better with more stuff.
  async create(dto: RequestDto): Promise<ResponseDto> {
    try {
      await this.validateDto(dto)
      const entity = await this.mapper.toEntity(dto)
      const savedEntity = await this.repository.create(entity)
      return this.mapper.toResponseDto(savedEntity)
    } catch (error) {
      console.error('Error creating entity:', error)
      this.handleError(error, 'Failed to create entity. Maybe try again?')
    }
  }

  // Get all entities, but now with pagination, filtering, and sorting.
  async findAll(
    page: number = 1,
    limit: number = 10,
    sortField: keyof Entity = 'id',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
    filters?: FindOptionsWhere<Entity>
  ): Promise<{ data: ResponseDto[]; count: number }> {
    try {
      const options: FindManyOptions<Entity> = {
        skip: (page - 1) * limit,
        take: limit,
        order: { [sortField]: sortOrder } as any,
        where: filters || {},
      }

      const [entities, count] = await this.repository.findAllWithPagination(options)
      const data = entities.map((entity) => this.mapper.toResponseDto(entity))

      return { data, count }
    } catch (error) {
      console.error('Error retrieving entities:', error)
      throw new InternalServerErrorException('Failed to retrieve entities. Maybe try again?')
    }
  }

  // Retrieve that one entity you care about.
  async findOne(id: number): Promise<ResponseDto> {
    try {
      const entity = await this.ensureEntityExists(id)
      return this.mapper.toResponseDto(entity)
    } catch (error) {
      console.error('Error retrieving entity:', error)
      this.handleError(error, 'Failed to retrieve entity. Maybe it was deleted?')
    }
  }

  // Update an existing entity.
  async update(id: number, dto: RequestDto): Promise<ResponseDto> {
    try {
      await this.ensureEntityExists(id)
      await this.validateDto(dto)
      const updatedEntity = await this.mapper.toEntity(dto)
      const result = await this.repository.update(id, updatedEntity)
      return this.mapper.toResponseDto(result)
    } catch (error) {
      console.error('Error updating entity:', error)
      this.handleError(error, 'Failed to update entity. Maybe try again?')
    }
  }

  // Delete that entity.
  async remove(id: number): Promise<void> {
    try {
      await this.ensureEntityExists(id)
      await this.repository.remove(id)
    } catch (error) {
      console.error('Error deleting entity:', error)
      this.handleError(error, 'Failed to delete entity.')
    }
  }

  // Validate the DTO like it's a pop quiz.
  private async validateDto(dto: RequestDto): Promise<void> {
    if (this.validator) {
      try {
        await this.validator.validate(dto)
      } catch (error: any) {
        console.error('Validation failed:', error)
        throw new BadRequestException(error.message || 'Validation failed. Check your input.')
      }
    }
  }

  // Make sure the entity exists.
  private async ensureEntityExists(id: number): Promise<Entity> {
    const entity = await this.repository.findOne(id)
    if (!entity) {
      console.error(`Entity with ID ${id} not found.`)
      throw new NotFoundException(`Entity with ID ${id} not found.`)
    }
    return entity
  }

  // Handle errors.
  private handleError(error: any, defaultMessage: string): never {
    if (error instanceof NotFoundException || error instanceof BadRequestException) {
      throw error
    }

    if (error.code === '23505') {
      throw new ConflictException('Entity already exists.')
    }

    throw new InternalServerErrorException(defaultMessage)
  }
}
