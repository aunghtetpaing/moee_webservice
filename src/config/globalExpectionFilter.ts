import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import {Response, Request} from 'express';
@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.SERVICE_UNAVAILABLE;

    response.status(status).send({
      errorCode: '010',
      errorMessage: 'SERVICE_UNAVAILABLE',
      description: "Cannot Call API",
    });

  }
}
