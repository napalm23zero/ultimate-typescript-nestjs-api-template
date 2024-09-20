# Rate Limiting

Welcome to the **Ultimate Guide** on how we implemented rate limiting in a NestJS application. Grab a coffee, because we’re about to dive deep into some serious best practices. And yes, there will be jokes — but only for the _serious_ professionals.

## Why Rate Limiting?

First, let’s address the elephant in the room. Why bother with rate limiting?

In an ideal world, every user would make exactly as many requests as your server can handle. But here in reality, bots, overeager users, and _that one client_ can bombard your servers. Rate limiting protects your API from abuse by setting a ceiling on how many requests a client can make in a specific time frame.

In our setup, we’re using Redis for the storage because local storage is so last decade. Redis gives us speed, reliability, and...caching!

## Folder Structure

Here's what we're working with:

```
src/
│
├── config/
│   ├── rate-limit.config.ts
├── app.module.ts
.env.development
```

## Rate Limit Configuration (`rate-limit.config.ts`)

So, how do we configure rate limiting? With **ThrottlerModule** and a custom **RedisThrottlerStorageService**.

We start by configuring the `ThrottlerModule` in the app module (`app.module.ts`). NestJS provides a handy built-in package for rate limiting, but we’re not basic — we need to level this up by using Redis as our storage.

Here’s a breakdown of the most important parts of the config file:

- **Throttle Limit**: How many requests you’ll tolerate before the client is throttled.
- **TTL (Time to Live)**: The time window (in seconds) for the throttling. After this time, the count resets. It’s like giving the user a "Get Out of Jail Free" card.
- **Block Duration**: How long they’ll be blocked once they hit the limit. This is the “punishment” for breaking the rules.

We configure these settings by pulling them from environment variables — which means you can fine-tune your app for different environments.

## Custom Redis Throttler Storage

Redis is our storage of choice because let’s face it — who doesn't love in-memory speed? We’ve defined a custom service that extends NestJS's default throttler storage. This service interacts with Redis, storing request counts and checking if a user should be blocked.

It’s like having **Darth Vader** keeping track of how many times someone annoys him. After the limit, you get force choked — or in our case, rate-limited.

### Key Components:

- `RedisThrottlerStorageService`: The custom service that handles hit counts and expirations in Redis.
- `increment()`: Increments the request count for a client and checks if they should be blocked. This method is like counting how many times someone hit "refresh" on your app.
- `reset()`: Clears the request count. Everyone deserves a second chance, right?

## The Guardian: Custom ThrottlerGuard

The **ThrottlerGuard** is where the magic happens. This guard checks if the user is over the request limit and throws an exception if they are. But we're not just giving them the default "too many requests" error — no, no, no. Our error messages are customized because we’re pros.

The guard uses `CustomThrottlerGuard`, which extends the base `ThrottlerGuard`. When the client gets throttled, it gently informs them to "slow down, cowboy."

### Key Highlights:

- **Throttle Message**: A customizable message pulled from environment variables that tells users when they’ve been blocked.
- **Request Tracking**: Each request is tracked by IP address (or you can customize this). It’s like building a digital trail of your most persistent clients.
- **Logging**: We log request hits for analysis. Yes, we log everything because — you guessed it — **logs are your best friend**.

## Environment Variables Setup

The environment variables live in `environment/.env.development`, and here’s how we’ve set them up for local development:

```
# Rate Limit Config
THROTTLE_LIMIT=10
THROTTLE_TTL=60
THROTTLE_BLOCK_DURATION=60
THROTTLE_MESSAGE="Too many requests, slow down cowboy!"
```

### Breakdown:

- **THROTTLE_LIMIT**: The maximum number of requests allowed.
- **THROTTLE_TTL**: How long (in seconds) before the count resets.
- **THROTTLE_BLOCK_DURATION**: How long a user is blocked after reaching the limit.
- **THROTTLE_MESSAGE**: The message we send to users once they’re blocked. (Feel free to customize this for added flair.)

## Why This Setup Matters

1. **Scalable and Flexible**: By using Redis, this setup can scale to handle thousands of clients without performance degradation. Redis is fast and can store a huge amount of hit records efficiently.
2. **Customizable**: Everything from the throttling limits to error messages can be customized. It’s flexible enough to work for any API.
3. **Efficient**: Redis ensures that rate limiting happens in near real-time, and the app can block users almost instantly once they reach the limit.

## Best Practices

- **Set Reasonable Limits**: Don’t throttle too aggressively. Find a sweet spot that balances user experience with server protection.
- **Custom Error Messages**: Be friendly (or a little sarcastic) with your error messages. It helps ease the frustration of being throttled.
- **Logging**: Always log rate-limiting actions. This will help with debugging and understanding user behavior.
- **Monitoring**: Keep an eye on how often users are being throttled. It might reveal some performance bottlenecks or areas to optimize.

## Response

This is what you will seee after requesting too much!

![Too Many Requests](../img/004.png 'Too Many Requests')

![Too Many Requests2](../img/005.png 'Too Many Requests2')

---

[back](table-of-contents.md)
