import * as crypto from 'crypto-js';

import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppLogger } from "src/services/logger.service";
import { AppConfig } from "../app.config";
import { app_level } from "../error.message";

import { AppVerification } from "src/interface/app.interface";
import { UnprocessableRequestResponse } from "src/interface/response.interface";

export enum ProcessStatus {
    PASS = 0,
    TOKEN_EMPTY = 1,
    LANG_EMPTY = 2,
    TOKEN_INVALID = 3,
}

@Injectable()
export class GlobalLoggerInterceptor implements NestInterceptor {

    responseObject: UnprocessableRequestResponse = {
        responseCode: HttpStatus.UNPROCESSABLE_ENTITY,
        errorCode: false,
        description: false,
    };

    decrypted: AppVerification;
    invalidToken: boolean = false;
    process: ProcessStatus = ProcessStatus.PASS;
    
    constructor(
        private readonly logger: AppLogger
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const request = context.switchToHttp().getRequest<Request>();
        const header: any = context.switchToHttp().getRequest<Request>().headers;
        const response: any = context.switchToHttp().getResponse<Response>();

        if(!header.token) {
            this.responseObject.errorCode = app_level.APPAUTH001.code;
            this.responseObject.description = app_level.APPAUTH001.message;
            this.responseObject.header = {
                Token: null
            }
            this.logger.error(app_level.APPAUTH001.message, app_level.APPAUTH001.code);
            this.process = ProcessStatus.TOKEN_EMPTY;
        }

        if(!header.language){
            this.responseObject.errorCode = app_level.APPLANG001.code;
            this.responseObject.description = app_level.APPLANG001.message;
            this.responseObject.header = {
                Language: null
            }
            this.logger.error(app_level.APPLANG001.message, app_level.APPLANG001.code);
            this.process = ProcessStatus.LANG_EMPTY;
        }

        if(this.process === ProcessStatus.PASS) {
            const token = crypto.AES.decrypt(header.token, AppConfig.accept_secret_key);
            token.sigBytes !== 32 ? 
            this.process = ProcessStatus.TOKEN_INVALID :
            this.decrypted = JSON.parse(token.toString(crypto.enc.Utf8))
        }

        if(this.process === ProcessStatus.TOKEN_INVALID) {
            this.responseObject.errorCode = app_level.APPAUTH002.code;
            this.responseObject.description = app_level.APPAUTH002.message;
            this.responseObject.header = {
                header: header.token
            }
            this.logger.error(app_level.APPAUTH002.message, app_level.APPAUTH002.code);
        }

        if((this.process === ProcessStatus.PASS) && (this.decrypted.env !== AppConfig.env || this.decrypted.version !== AppConfig.version)) {
            this.responseObject.errorCode = app_level.APPSUPPORT001.code,
            this.responseObject.description = app_level.APPSUPPORT001.message;
            this.responseObject.header = {
                Token : header.token,
                ...this.decrypted
            }
            this.logger.error(app_level.APPSUPPORT001.message, app_level.APPSUPPORT001.code);
        }

        return next.handle()
        .pipe(
            tap(() => {
                if(this.process !== ProcessStatus.PASS) {
                    return response.status(HttpStatus.UNPROCESSABLE_ENTITY).json(this.responseObject);
                } else {
                    this.logger.log(`Successfully request to '${request.url}'`,'HTTP-Request')
                }
            })
        )

    }
}