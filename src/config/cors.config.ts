import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

/**
 * Configures Cross-Origin Resource Sharing (CORS) settings for the application.
 * Because letting anyone access your API is fun until it's not.
 *
 * @returns CorsOptions - The configuration object for CORS.
 */
export function setupCors(): CorsOptions {
  return {
    // Determine which origins are allowed to access the API.
    // In development, we might be lenient, but in production, only the VIPs get in.
    origin: (origin, callback) => {
      const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')
      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        // The origin is allowed. Proceed, noble requester.
        callback(null, true)
      } else {
        // Access denied. Maybe next time, friend.
        callback(new Error('Not allowed by CORS'))
      }
    },

    // The sacred HTTP methods we permit. If your method isn't here, you're out of luck.
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],

    // Headers we graciously allow clients to send.
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],

    // Headers we allow the client to see in responses.
    exposedHeaders: ['Content-Length', 'Content-Type'],

    // Allow credentials like cookies and authorization headers.
    credentials: true, // Yes, you may bring your cookies. Just don't crumble them on the carpet.

    // The status code sent on a successful OPTIONS request.
    optionsSuccessStatus: 204, // Because sometimes, saying nothing is better.

    // Do not continue processing the preflight response.
    preflightContinue: false, // Let's not drag this out any longer than necessary.
  }
}
