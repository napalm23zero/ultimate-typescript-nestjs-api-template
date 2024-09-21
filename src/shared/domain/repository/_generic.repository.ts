import { DeepPartial, FindManyOptions, ObjectLiteral, Repository } from 'typeorm'

/**
 * A generic repository for managing entities using TypeORM.
 * Provides basic CRUD operations and abstracts some common patterns.
 *
 * @template T The entity type to be managed by the repository.
 */
export class _GenericRepository<T extends ObjectLiteral> {
  constructor(private readonly repository: Repository<T>) {}

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options)
  }

  async findAllWithPagination(options: FindManyOptions<T>): Promise<[T[], number]> {
    return await this.repository.findAndCount(options)
  }

  async findOne(id: number): Promise<T | null> {
    return (await this.repository.findOne({ where: { id } as any })) || null
  }

  async create(entity: T): Promise<T> {
    return await this.repository.save(entity)
  }

  async update(id: number, entity: DeepPartial<T>): Promise<T | null> {
    await this.repository.update(id, entity as any)
    return await this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id)
    if (entity) {
      await this.repository.remove(entity)
    }
  }
}
