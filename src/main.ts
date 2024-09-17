import { NestFactory } from '@nestjs/core'
import { json, urlencoded } from 'express'
import { setupCors } from 'src/config/cors.config'
import { setupSwagger } from 'src/config/swagger.config'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log', 'debug'] })

  // Enable JSON and URL-encoded data parsing
  app.use(json())
  app.use(urlencoded({ extended: true }))

  // Setup CORS with custom configuration
  app.enableCors(setupCors())

  // Setup Swagger documentation
  setupSwagger(app)

  // Listen on the configured port
  const port = 3000
  await app.listen(port)
  console.log(`Application is running on: http://localhost:${port}`)
}
bootstrap()
