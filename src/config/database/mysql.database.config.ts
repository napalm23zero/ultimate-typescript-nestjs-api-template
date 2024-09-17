import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'

/**
 * MySQL Database Configuration Factory.
 * This sets up the TypeORM configuration using environment variables.
 */
export const mysqlConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get<string>('MYSQL_HOST', 'localhost'),
  port: configService.get<number>('MYSQL_PORT', 3306),
  username: configService.get<string>('MYSQL_USER', 'root'),
  password: configService.get<string>('MYSQL_PASSWORD', 'password'),
  database: configService.get<string>('MYSQL_DATABASE', 'database_name'),
  synchronize: configService.get<boolean>('MYSQL_SYNCHRONIZE', true),
  entities: [join(__dirname, '/../**/entity/*.ts'), join(__dirname, '/../**/entity/*.js')],
})

/**
 * Sets up MySQL Database connection and runs a test query.
 * It uses TypeORM to initialize the connection.
 */
export async function connectMySqlDatabase(app: any): Promise<void> {
  const configService = app.get(ConfigService)
  const dbOptions = mysqlConfig(configService)

  try {
    const dataSource = new DataSource(dbOptions as DataSourceOptions)
    await dataSource.initialize()
    await dataSource.query('SELECT 1') // Quick test to ensure the connection is valid
    console.log('MySQL connected successfully! 🐬')
  } catch (error) {
    console.error('MySQL Database connection failed. ❌', error)
  }
}
