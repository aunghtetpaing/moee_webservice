import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { NotFoundRequestResponse } from 'src/interface/response.interface';
import { http_error } from '../config/error.message';

@Catch(HttpException)
export class GlobalExpectionFilter implements ExceptionFilter {

  pageNotFoundResponse: NotFoundRequestResponse = {
    responseCode: HttpStatus.NOT_FOUND,
    errorCode : http_error[404].code,
    description: http_error[404].message,
    url: false
  };

  constructor() { }

  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if(status === 404) {
      this.pageNotFoundResponse.url= request.url;
      return response.status(HttpStatus.NOT_FOUND).json(this.pageNotFoundResponse);
    }

  }
}