import { HttpStatus, HttpException } from "@nestjs/common";

export const sortObject = (obj: Object) => {
    return Object.keys(obj).sort().reduce((res, key) => (res[key] = obj[key], res), {});
}

export const typeTransform = (target: Object) => {
    let newObject:any = {};

    Object.keys(target).map((keys) => {

        if(target[keys] === 'true' || target[keys] === 'false') {
            newObject[keys] = eval(target[keys]);
        }

        if(target[keys] === '0') {
            newObject[keys] = 0;
        }

        if(Number(target[keys])) {
            newObject[keys] = Number(target[keys]);
        }

        
        if(target[keys] !== 'true' && target[keys] !== 'false' && !Number(target[keys]) && target[keys] !== '0') {
            newObject[keys] = target[keys];
        } 
    });

    console.log(newObject);
    return newObject;
}

export const httpResponseException =  async (errorCode: string, message?: string, data?: any) => {
    let httpResponse: any = {};
    let httpStatus: number;
    let httpMessage: string;

    errorCode === '000' ? (httpStatus = HttpStatus.OK, httpMessage = 'SUCCESS') :
    errorCode === '004' ? (httpStatus = HttpStatus.BAD_REQUEST, httpMessage = 'BAD_REQUEST') :
    errorCode === '005' ? (httpStatus = HttpStatus.FORBIDDEN, httpMessage = 'FORBIDDEN') :
    errorCode === '006' ? (httpStatus = HttpStatus.UNAUTHORIZED, httpMessage = 'UNAUTHORIZED') :
    errorCode === '046' ? (httpStatus = HttpStatus.NOT_ACCEPTABLE, httpMessage = 'NOT_ACCEPTABLE') :
    errorCode === '055' ? (httpStatus = HttpStatus.SERVICE_UNAVAILABLE, httpMessage = 'SERVICE_UNAVAILABLE') :
    (httpStatus = HttpStatus.SERVICE_UNAVAILABLE, httpMessage = 'SERVICE_UNAVAILABLE', errorCode = '055');

    httpResponse.errorCode = errorCode;
    httpResponse.description = httpMessage;
    httpResponse.message = message;

    data ? httpResponse.data = data : httpResponse.data = [];
    
    throw new  HttpException( sortObject(httpResponse), httpStatus);
}
