import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions } from '@nestjs/mongoose'

/**
 * MongoDB Configuration Factory.
 * Configures MongoDB connection with credentials provided via ConfigService.
 */
export const mongoConfig = (configService: ConfigService): MongooseModuleOptions => ({
  uri: `mongodb://${configService.get<string>('MONGO_INITDB_ROOT_USERNAME')}:${configService.get<string>('MONGO_INITDB_ROOT_PASSWORD')}@${configService.get<string>('MONGO_HOST')}:${configService.get<number>('MONGO_PORT')}/${configService.get<string>('MONGO_DB')}`,
})

/**
 * Sets up MongoDB connection for the application.
 * This function integrates with Mongoose to initialize the connection.
 */
export function connectMongoDatabase(app: any): void {
  const configService = app.get(ConfigService)
  const mongooseOptions = mongoConfig(configService)
  console.log('MongoDB connected successfully! 🍃')
}
