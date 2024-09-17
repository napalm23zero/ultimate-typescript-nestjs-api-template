# Environment Variables

So, you've made it here to figure out how to make your app obey your every command, depending on the environment you're in. Well, lucky you! This doc is going to walk you through setting up environment variables and how we’ve structured everything to ensure the right configuration is loaded at the right time.

## Folder Structure? Oh Yeah, We Got That.

Here’s how your project should look now:

```
- environment/
    - .env.development
    - .env.production
- src/
    - config/
        - cors.config.ts
        - swagger.config.ts
        - app.module.ts
    - main.ts
.env
```

Let’s break it down:

- **environment/**: Where all the magic `.env` files live. Each environment (development, production) has its own `.env` file.
- **src/config/**: Where your project configuration files (like CORS and Swagger) live.

## How Do the `.env` Files Work?

Each `.env` file defines variables specific to the environment. For example:

#### `environment/.env.development`

```ini
NODE_ENV=development
APP_PORT=3000
ALLOWED_ORIGINS=*
SWAGGER_TITLE=Ultimate Typescript NestJS API Template
SWAGGER_DESCRIPTION=This is the ultimate template for a Typescript NestJS API
SWAGGER_VERSION=1.0
```

#### `environment/.env.production`

```ini
NODE_ENV=production
APP_PORT=8000
ALLOWED_ORIGINS=https://your-production-domain.com,https://another-trusted-domain.com
SWAGGER_TITLE=Ultimate Typescript NestJS API Template
SWAGGER_DESCRIPTION=Production API for Typescript NestJS
SWAGGER_VERSION=1.0
```

Each file sets values for the environment variables used in the application.

## `main.ts` - The Orchestrator

In `main.ts`, we’ve added some beautiful code to ensure that the right `.env` file is loaded based on your environment. The dotenv package is responsible for this wizardry.

Here’s the highlight reel:

```typescript
config({ path: `./environment/.env.${process.env.NODE_ENV || 'development'}` })
```

If you're in development mode (`NODE_ENV=development`), it loads `.env.development`. If you're in production (`NODE_ENV=production`), it loads `.env.production`. Simple, right? That’s the kind of simplicity that brings a tear to the eye.

## CORS Configuration

CORS (because we don't trust everyone) is setup inside `cors.config.ts` to use the `ALLOWED_ORIGINS` variable. If you’re running in production, it checks the domains allowed from your `.env.production`. In dev, it allows everything (dangerous, but YOLO in dev).

```typescript
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')
```

This makes sure you don’t end up allowing just any domain to have a party with your API in production.

## Swagger Configuration

Swagger is your documentation BFF. It helps you interact with your API and is configured in `swagger.config.ts` using the `.env` file settings like `SWAGGER_TITLE`, `SWAGGER_DESCRIPTION`, and `SWAGGER_VERSION`.

```typescript
const config = new DocumentBuilder()
  .setTitle(process.env.SWAGGER_TITLE)
  .setDescription(process.env.SWAGGER_DESCRIPTION)
  .setVersion(process.env.SWAGGER_VERSION)
  .build()
```

## How to Run This Bad Boy?

- Development? Run it with:
  ```bash
  NODE_ENV=development npm run start
  ```
- Production? You better be careful, but here you go:
  ```bash
  NODE_ENV=production npm run start
  ```

And there you go! You're now in full control of the environment variables. Congratulations! You’re one step closer to being a professional environment ninja.

[back](table-of-contents.md)
