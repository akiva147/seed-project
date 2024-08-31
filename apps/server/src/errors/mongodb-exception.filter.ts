import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongodbExceptionFilter implements ExceptionFilter {
  // https://docs.rs/mongodb/0.1.6/src/mongodb/.cargo/registry/src/github.com-1ecc6299db9ec823/mongodb-0.1.6/src/error.rs.html
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    // Customize based on your needs
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    // Handle specific MongoDB errors here if needed
    if (exception.code) {
      switch (exception.code) {
        case 11000: // Duplicate Key Error
          statusCode = HttpStatus.CONFLICT;
          message = 'Duplicate Key Error';
          break;

        case 1: // Internal Error
          statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
          message = 'Mongo Internal Server Error';
          break;

        case 13: // Unauthorized
          statusCode = HttpStatus.UNAUTHORIZED;
          message = 'Mongo Unauthorized';
          break;

        case 121: // Document failed validation
          statusCode = HttpStatus.BAD_REQUEST;
          message = 'Document validation failed';
          break;

        case 24: // Lock Timeout
          statusCode = HttpStatus.REQUEST_TIMEOUT;
          message = 'Lock timeout, operation exceeded time limit';
          break;

        case 50: // Maximum Execution Time Exceeded
          statusCode = HttpStatus.REQUEST_TIMEOUT;
          message = 'Maximum execution time exceeded';
          break;

        // Add more cases as needed

        default:
          // Unhandled MongoError Code
          message = 'An unknown database error occurred';
      }
    }

    response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      message,
    });
  }
}
