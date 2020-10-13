import * as crypto from 'crypto-js';

import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";

import { AppLogger } from "src/services/logger.service";
import { AppConfig } from "../app.config";
import { app_level } from "../error.message";

import { AppVerification } from "src/interface/app.interface";
import { UnprocessableRequestResponse } from "src/interface/response.interface";

@Injectable()
export class GlobalInterceptor implements NestInterceptor {

    request: any;
    headers: any;
    response: any;
    responseObject: UnprocessableRequestResponse = {
        responseCode: HttpStatus.UNPROCESSABLE_ENTITY,
        errorCode: false,
        description: false,
    };
    decrypted: AppVerification;
    
    constructor(
        private readonly logger: AppLogger
    ) { }

    private async setResponseObject(errorCode: string, header?: any) {
        this.responseObject.errorCode = await app_level[errorCode].code;
        this.responseObject.description = await app_level[errorCode].message;
        this.responseObject.header = await header;
        this.logger.error(app_level[errorCode].message, app_level[errorCode].code);
        return false;
    }

    private async tokenValidation(token: any): Promise<boolean>{
        if(token.sigBytes === 36) {
            this.decrypted = JSON.parse(token.toString(crypto.enc.Utf8));
            return true;
        } else {
            await this.setResponseObject('APPAUTH002', {
                Token: this.headers.token
            });
            return false;
        }
    }

    private async nextCallHandler(status: boolean): Promise<boolean> {
        if(status) {
            this.logger.log(`Successfully request to '${this.request.url}'`,'HTTP-Request');
            return true;
        } else {
            await this.response.status(HttpStatus.UNPROCESSABLE_ENTITY).json(this.responseObject);
            return false;
        }
    }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {

        this.request = context.switchToHttp().getRequest<Request>();
        this.headers = context.switchToHttp().getRequest<Request>().headers;
        this.response = context.switchToHttp().getResponse<Response>();

        let isToken: boolean = false;
        let status: boolean = true;
        let isNext: boolean = false;

        if(!this.headers.token) {
            status = await this.setResponseObject('APPAUTH001', { 
                Token: null 
            })
        }

        if(!this.headers.language){
            status = await this.setResponseObject('APPLANG001', { 
                Language: null 
            });
        }

        if(status){
            const token = crypto.AES.decrypt(this.headers.token, AppConfig.appKey);
            isToken = await this.tokenValidation(token);
            status = isToken;
        }

        if(isToken && this.decrypted.env !== AppConfig.env) {
            status = await this.setResponseObject('APPSUPPORT003', {
                environment: this.decrypted.env
            })
        }

        if(isToken && this.decrypted.version !== AppConfig.version) {
            status = await this.setResponseObject('APPSUPPORT001', {
                environment: this.decrypted.version
            })
        }

        isNext = await this.nextCallHandler(status);
        
        if(isNext) {
            return next.handle()
        }
    }
}