import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

/**
 * Setup Swagger documentation for the API.
 * Swagger provides a user-friendly interface to explore and test the API.
 */
export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle(process.env.SWAGGER_TITLE) // Title, we all like titles
    .setDescription(process.env.SWAGGER_DESCRIPTION) // Description, we all need to know what we're doing
    .setVersion(process.env.SWAGGER_VERSION) // Version, we all like to keep track of things
    .addTag('ultimate-typescript-nestjs-api-template') // Tag, because we all need to organize
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
}
