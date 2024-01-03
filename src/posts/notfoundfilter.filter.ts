import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { NotFoundException } from './notFoundException.exception';
import { Request, Response } from 'express';

@Catch()
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const request: Request = host.switchToHttp().getRequest();
    const response: Response = host.switchToHttp().getResponse();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.originalUrl,
    });
  }
}
