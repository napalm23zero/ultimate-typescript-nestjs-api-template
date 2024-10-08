# Documenting Your Application with Swagger

### Introduction

Welcome to the era of **automatic API documentation**. Gone are the days of doing it manually (because really, who has time for that?). We’re embracing **Swagger** (or **OpenAPI** if you want to impress someone in a meeting). Swagger serves two purposes:

1. It gives users a more friendly way to interact with your app’s endpoints.
2. It helps developers know exactly what you're expecting to receive and what you plan to send back. No more guesswork!

### Step 1: Installing Swagger

First things first, we need to install Swagger. It's simple, just run this command:

```bash
npm i @nestjs/swagger
```

Done? Good, you're on your way to greatness.

### Step 2: Creating a Config File

Now that we’re **organized** (or at least pretending to be), let’s create a configuration file for Swagger. We’ll put this in `src/config/swagger.config.ts`:

```typescript
import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Ultimate Typescript NestJS API Template')
    .setDescription('This is the ultimate template for a Typescript NestJS API')
    .setVersion('1.0')
    .addTag('ultimate-typescript-nestjs-api-template')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
}
```

Why do this? Because having everything centralized and in its own neat file makes life easier, and you’ll feel like a professional developer while doing it.

### Step 3: Integrating Swagger into the Project

With the config file set, it’s time to integrate Swagger into your app. Head to `src/main.ts` and add the following:

```typescript
// Setup Swagger documentation
setupSwagger(app)
```

And don’t be the person who forgets to import the `setupSwagger` function. Add this too:

```typescript
import { setupSwagger } from 'src/config/swagger.config'
```

You don't want your Swagger setup to disappear into the void, do you?

### Step 4: Testing

That’s it! Now fire up your app and head over to:

```
http://localhost:3000/api
```

You’ll see something that looks like this:

![Swagger Example](../img/001.png 'Swagger')

Feel free to click **"Try out"** if you're feeling brave. When you do, you’ll get something like this in response:

![Swagger Test](../img/002.png 'Swagger Test')

---

**Congrats, you Swagger wizard!** Now your application is automatically documented, your fellow developers won't need to be psychic to understand how your API works, and you can officially call yourself _fancy_. 🎉

---

[back](table-of-contents.md)
