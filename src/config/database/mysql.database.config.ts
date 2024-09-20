import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'

/**
 * Generates MySQL database configuration using environment variables.
 *
 * @param configService - Service to access environment variables because hardcoding is so 1990s.
 * @returns TypeORM module options for MySQL connection.
 */
export const mysqlConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  // Fetch the MySQL host, defaulting to 'localhost'—because where else would your database be?
  host: configService.get<string>('MYSQL_HOST', 'localhost'),
  // Fetch the MySQL port, defaulting to 3306—the universal number for "I didn't change the default port."
  port: configService.get<number>('MYSQL_PORT', 3306),
  // Fetch the MySQL username, defaulting to 'root'—the username equivalent of "admin123".
  username: configService.get<string>('MYSQL_USER', 'root'),
  // Fetch the MySQL password. If your password is actually 'password', we need to have a talk.
  password: configService.get<string>('MYSQL_PASSWORD', 'password'),
  // Fetch the database name, defaulting to 'database_name'—because imagination is hard.
  database: configService.get<string>('MYSQL_DATABASE', 'database_name'),
  // Decide whether to synchronize the database schema—set to true because who needs data integrity?
  synchronize: configService.get<boolean>('MYSQL_SYNCHRONIZE', true),
  // Include entity files because TypeORM can't read your mind (yet).
  entities: [join(__dirname, '/../**/entity/*.ts'), join(__dirname, '/../**/entity/*.js')],
})

/**
 * Connects to the MySQL database and runs a test query to ensure everything's working.
 *
 * @param app - The application instance to retrieve the ConfigService, because why pass it directly?
 */
export async function connectMySqlDatabase(app: any): Promise<void> {
  // Retrieve the ConfigService from the application context.
  const configService = app.get(ConfigService)
  // Get the database configuration options.
  const dbOptions = mysqlConfig(configService)

  try {
    // Initialize a new DataSource with the database options.
    const dataSource = new DataSource(dbOptions as DataSourceOptions)
    await dataSource.initialize()
    // Run a quick test query to make sure the database isn't on vacation.
    await dataSource.query('SELECT 1')
    console.log('MySQL connected successfully! 🐬')
  } catch (error) {
    // If something goes wrong, log the error and contemplate life choices.
    console.error('MySQL Database connection failed. ❌', error)
  }
}
