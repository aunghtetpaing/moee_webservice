import * as crypto from 'crypto-js';

import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { AppType, AppVerification } from 'src/interface/app.interface';
import { AppConfig } from './app.config';
import { UnprocessableRequestResponse } from 'src/interface/response.interface';
import { app_level } from './error.message';

@Injectable()
export class GlobalGuards implements CanActivate {

    responseObject: UnprocessableRequestResponse = {
        responseCode: HttpStatus.UNPROCESSABLE_ENTITY,
        errorCode: false,
        description: false,
    };

    decrypted: AppVerification;
    invalidToken: boolean = false;

    constructor() { }

    canActivate(context: ExecutionContext): boolean | any {
        const request: any = context.switchToHttp().getRequest<Request>().headers;
        const response: any = context.switchToHttp().getResponse<Response>();

        if(!request.token) {
            this.responseObject.errorCode = app_level.APPAUTH001.code;
            this.responseObject.description = app_level.APPAUTH001.message;
            this.responseObject.header = {
                Token: null
            }
            return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json(this.responseObject);
        }

        if(!request.language){
            this.responseObject.errorCode = app_level.APPLANG001.code;
            this.responseObject.description = app_level.APPLANG001.message;
            this.responseObject.header = {
                Language: null
            }
            return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json(this.responseObject);
        }

        if(request.token) {
            const token = crypto.AES.decrypt(request.token, AppConfig.accept_secret_key);
            token.sigBytes !== 32 ? 
            this.invalidToken = true :
            this.decrypted = JSON.parse(token.toString(crypto.enc.Utf8))
        }

        if(this.invalidToken) {
            this.responseObject.errorCode = app_level.APPAUTH002.code;
            this.responseObject.description = app_level.APPAUTH002.message;
            this.responseObject.header = {
                header: request.token
            }
            return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json(this.responseObject);
        }

        if(!this.invalidToken && (this.decrypted.env !== AppConfig.env || this.decrypted.version !== AppConfig.version)) {
            this.responseObject.errorCode = app_level.APPSUPPORT001.code,
            this.responseObject.description = app_level.APPSUPPORT001.message;
            this.responseObject.header = {
                Token : request.token,
                ...this.decrypted
            }
            return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json(this.responseObject);
        }
     
    return true;
  }
}