import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

/**
 * Setup CORS configuration for the application.
 * This is necessary to allow or deny access to the API from different origins.
 */
export function setupCors(): CorsOptions {
  return {
    // We'll allow any origin in dev... but in production? Only the chosen ones.
    origin: (origin, callback) => {
      const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')
      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        callback(null, true) // You shall pass.
      } else {
        callback(new Error('Not allowed by CORS')) // Access denied. Out of here, PUNK!
      }
    },

    // The holy methods that we allow. If it's not here, you're not welcome.
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],

    // These headers are acceptable. Anything else? You're outta here!
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],

    // Headers we allow you to peek at. We’re not that generous, so here's the shortlist.
    exposedHeaders: ['Content-Length', 'Content-Type'],

    // Credentials are allowed, because, you know, some people need cookies to function.
    credentials: true, // Yes, you can bring your cookies... YAY!

    // Because the world needs OPTIONS to be fast and painless.
    optionsSuccessStatus: 204, // No content, no problems.

    // If we resolve the preflight request, we don't want it sticking around like a bad smell.
    preflightContinue: false,
  }
}
