import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

interface HttpExceptionResponse {
  statusCode: number;
  timeStamp: string;
  message: string;
  details?: object | null;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const ResponseBody: HttpExceptionResponse = {
      statusCode: status,
      timeStamp: new Date().toISOString(),
      message: exception.message,
      details: null,
    };

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();

      if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'message' in exceptionResponse &&
        typeof exceptionResponse.message === 'string'
      ) {
        ResponseBody.message = exceptionResponse.message;
      }

      if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        'details' in exceptionResponse &&
        typeof exceptionResponse.details === 'object'
      ) {
        ResponseBody.details = exceptionResponse.details;
      }
    }

    new Logger('HttpExceptionFilter').error(
      `HTTP Exception: ${JSON.stringify(ResponseBody)}`,
    );
    response.status(status).json(ResponseBody);
  }
}
