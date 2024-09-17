import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Ultimate Typescript NestJS API Template')
    .setDescription('This is the ultimate template for a Typescript NestJS API')
    .setVersion('1.0')
    .addTag('ultmate-typescript-nestjs-api-template')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
}
