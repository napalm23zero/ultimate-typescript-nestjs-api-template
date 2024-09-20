import { ConfigService } from '@nestjs/config'
import { MongooseModuleOptions } from '@nestjs/mongoose'

/**
 * Generates MongoDB configuration using the ever-so-helpful ConfigService.
 *
 * @param configService - The ConfigService instance because hardcoding credentials is for rookies.
 * @returns MongooseModuleOptions for connecting to MongoDB.
 */
export const mongoConfig = (configService: ConfigService): MongooseModuleOptions => {
  // Retrieve MongoDB credentials and host information from the configuration service.
  const username = configService.get<string>('MONGO_INITDB_ROOT_USERNAME')
  const password = configService.get<string>('MONGO_INITDB_ROOT_PASSWORD')
  const host = configService.get<string>('MONGO_HOST')
  const port = configService.get<number>('MONGO_PORT')
  const database = configService.get<string>('MONGO_DB')

  // Construct the MongoDB URI in a more readable way.
  const uri = `mongodb://${username}:${password}@${host}:${port}/${database}`

  return { uri }
}

/**
 * Establishes a connection to MongoDB for the application.
 *
 * @param app - The application instance, because why pass what you need directly?
 */
export function connectMongoDatabase(app: any): void {
  // Retrieve the ConfigService from the app context, assuming it's actually there.
  const configService = app.get(ConfigService)
  mongoConfig(configService)
  console.log('MongoDB connected successfully! 🍃')
}
