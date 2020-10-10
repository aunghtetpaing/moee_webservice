import { HttpStatus } from "@nestjs/common";

export interface SuccessResponse {
    responseCode: HttpStatus.OK;
    status: 'Success' | string;
    description: string;
    data?: any;
    metaData?: any;
}

export interface BadRequestResponse {
    responseCode: HttpStatus.BAD_REQUEST;
    errorCode: string;
    status: string | false;
    description: string | false;
}

export interface NotFoundRequestResponse {
    responseCode: HttpStatus.NOT_FOUND;
    errorCode: string;
    description: string;
    url: string | false;
}

export interface responseData {
    message?: string;
    data: any;
}

export interface UnAuthRequsetResponse {
    responseCode: HttpStatus.UNAUTHORIZED;
    errorCode: string | false;
    description: string | false;
    data?: any;
}

export interface ForbiddenRequsetResponse {
    responseCode: HttpStatus.FORBIDDEN;
    errorCode: string | false;
    description: string | false;
    data?: any;
}

export interface UnprocessableRequestResponse {
    responseCode: HttpStatus.UNPROCESSABLE_ENTITY;
    errorCode: string | false;
    description: string | false;
    header?: any;
}