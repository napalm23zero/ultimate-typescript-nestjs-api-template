import { NestFactory } from '@nestjs/core'
import { config } from 'dotenv'
import { json, urlencoded } from 'express'
import { AppModule } from './app.module'
import { setupCors } from './config/cors.config'
import { setupSwagger } from './config/swagger.config'

// Load environment variables based on the current environment from the "environment/" folder
config({ path: `./environment/.env.${process.env.NODE_ENV || 'development'}` })

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log', 'debug'] })

  // Enable JSON and URL-encoded data parsing
  app.use(json())
  app.use(urlencoded({ extended: true }))

  // Setup CORS configuration
  app.enableCors(setupCors())

  // Setup Swagger documentation
  setupSwagger(app)

  // Listen on the configured port from the .env file, or fallback to port 3000
  const port = process.env.APP_PORT || 3000
  await app.listen(port)
  console.log(`Application is running on: http://localhost:${port}`)
}
bootstrap()
