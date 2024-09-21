import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'

/**
 * A global HTTP exception filter that handles all uncaught exceptions in the application,
 * with an option to add a custom message for non-HTTP exceptions.
 *
 * This filter catches both HTTP-related exceptions (instances of `HttpException`) and other
 * unknown exceptions, providing a standardized JSON response format.
 *
 * If a custom message is provided (e.g., 'Something went wrong'), it will be returned in the `message`
 * field, while the HTTP status code and the default/extracted message will appear in `httpStatusCode`
 * and `httpStatusMessage`, respectively.
 *
 * The response contains the following fields:
 * - `httpStatusCode`: The HTTP status code (e.g., 404, 500).
 * - `httpStatusMessage`: A message extracted from the exception or a default 'Internal server error'.
 * - `message`: A custom message (if provided) for non-HTTP exceptions.
 * - `timestamp`: The time at which the error occurred, in ISO format.
 * - `path`: The URL of the request that caused the exception.
 */
@Catch()
export class GenericHttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly customMessage?: string) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status = this.getStatus(exception)
    const httpStatusMessage = this.getHttpStatusMessage(exception)
    const message = this.customMessage || httpStatusMessage

    response.status(status).json({
      httpStatusCode: status,
      httpStatusMessage,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }

  /**
   * Determines the appropriate HTTP status code based on the type of exception.
   *
   * @param {unknown} exception The exception thrown during the request lifecycle.
   * @returns {number} The HTTP status code to be returned in the response.
   */
  private getStatus(exception: unknown): number {
    return exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
  }

  /**
   * Extracts the default or custom HTTP status message from the exception.
   *
   * @param {unknown} exception The exception thrown during the request lifecycle.
   * @returns {string | object} The HTTP status message or default error message.
   */
  private getHttpStatusMessage(exception: unknown): string | object {
    return exception instanceof HttpException ? exception.getResponse() : 'Internal server error'
  }
}
