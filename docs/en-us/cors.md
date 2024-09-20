# CORS Configuration in Our Application

Welcome to the **CORS saga**, where we wield ruthless security. Let’s walk through how **CORS** (Cross-Origin Resource Sharing) is handled in this NestJS application. Buckle up.

## What’s CORS?

Imagine your API as a posh VIP lounge, and all incoming requests are potential gate-crashers. **CORS** is the bouncer that makes sure only trusted domains (like your chosen production URLs) get access. In simple terms, it’s a mechanism that allows (or denies) web apps from one domain to interact with resources on another domain. No ticket? No entry. And don’t even try sweet-talking the bouncer.

## The Key Changes

### `src/config/cors.config.ts`

In our application, we have a custom configuration for CORS. The **CORS bouncer** is configured using the `setupCors()` function. Here's what it does:

- **Origin control**: In development, we allow any origin (\*). But in production, only the **chosen few** (trusted domains) are allowed. This ensures your API doesn’t become a public playground.
- **Allowed Methods**: Only the methods we deem worthy (`GET`, `POST`, `DELETE`, etc.) can pass through. If your request is using something else, guess what? You’re out.
- **Allowed Headers**: We don’t want any shady headers sneaking in, so only headers like `Content-Type` and `Authorization` are permitted.
- **Exposed Headers**: We let you peek at a few headers, like `Content-Length` and `Content-Type`. Don’t get greedy.
- **Credentials**: Yep, we’re cool with cookies (and other credentials) being passed along. But only because we trust you.
- **Preflight Requests**: We make sure these annoying **OPTIONS** requests are handled quickly, with a nice, clean 204 response. No drama.

### Enabling CORS in `main.ts`

Now that we’ve built our CORS fortress, we enable it in `main.ts`:

```typescript
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setupCors } from './config/cors.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Setup CORS with custom configuration
  app.enableCors(setupCors())

  await app.listen(3000)
}
bootstrap()
```

This is where the magic happens: the `enableCors(setupCors())` is like pressing the “activate shields” button. You’re now protected from the dark forces of untrusted requests.

## Why Do You Care?

Because without CORS, your application would be vulnerable to _cross-origin attacks_. Not to mention, it could become the Wild West of APIs, where anyone from anywhere can try to shoot their shot. We don’t want that.

In short: **CORS** ensures that only the right people, from the right places, can access your precious resources.

---

## Final Thoughts

With our custom CORS configuration, you’re like the Jedi Master of your API, defending your kingdom with a perfectly balanced defense strategy. And if some shady origin tries to breach the gates? They’ll be met with a swift and merciless rejection.

"These aren't the requests you're looking for." Move along.

---

[back](table-of-contents.md)
