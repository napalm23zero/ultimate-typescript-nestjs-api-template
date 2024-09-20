import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

/**
 * Sets up Swagger documentation for the API.
 * Because who doesn't love a good UI to play with APIs?
 *
 * @param app - The NestJS application instance, our lovely app that needs some swagger.
 */
export function setupSwagger(app: INestApplication): void {
  // Create a config object for Swagger using the DocumentBuilder.
  const config = new DocumentBuilder()
    // Set the title of the API documentation. Titles make everything look official.
    .setTitle(process.env.SWAGGER_TITLE || 'API Documentation')
    // Set the description of the API. Descriptions help us pretend we know what we're doing.
    .setDescription(process.env.SWAGGER_DESCRIPTION || 'API endpoints and schemas')
    // Set the version of the API. Versioning: because breaking changes are a way of life.
    .setVersion(process.env.SWAGGER_VERSION || '1.0')
    // Add a tag to group endpoints. Tags are like labels but fancier.
    .addTag('ultimate-typescript-nestjs-api-template')
    // Build the configuration. Time to wrap it up.
    .build()

  // Generate the Swagger document using the application instance and config.
  const document = SwaggerModule.createDocument(app, config)

  // Setup the Swagger module with the generated document.
  // Now we have a fancy UI at '/api' to test our endpoints.
  SwaggerModule.setup('api', app, document)
}
