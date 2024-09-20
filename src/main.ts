import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { config } from 'dotenv'
import { json, urlencoded } from 'express'
import { connectMongoDatabase } from 'src/config/database/mongo.database.config'
import { connectMySqlDatabase } from 'src/config/database/mysql.database.config'
import { connectRedisDatabase } from 'src/config/database/redis.database.config'
import { setupSwagger } from 'src/config/swagger.config'
import { AppModule } from './app.module'

// Load environment variables from the .env file and override existing variables
config({ path: `./environment/.env.${process.env.NODE_ENV || 'development'}`, override: true })

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log', 'debug'] })

  // Get ConfigService instance
  const configService = app.get(ConfigService)

  // Enable JSON and URL-encoded data parsing
  app.use(json())
  app.use(urlencoded({ extended: true }))

  // Setup Swagger
  setupSwagger(app)

  // Connect MySQL
  await connectMySqlDatabase(app)

  // Connect Redis
  connectRedisDatabase(configService)

  // Connect MongoDB
  connectMongoDatabase(app)

  // Listen on the configured port
  const port = configService.get<number>('APP_PORT', 3000)
  await app.listen(port)
  console.log(`Application is running on: http://localhost:${port}`)
}

bootstrap()
