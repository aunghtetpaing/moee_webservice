import * as apiMessage from '../config/json/api.essage.json';

import { HttpStatus, Injectable } from "@nestjs/common";
import { HttpResponseInterface } from "src/interface/response.interface";

@Injectable()
export class HttpResponseService {

    constructor() { }

    async setResponseObject(status: HttpStatus, errorCode: string, data?:any, payload?: any): Promise<HttpResponseInterface> {

        let responseObject: HttpResponseInterface = {
            responseCode: status,
            errorCode: errorCode,
            description: await apiMessage[errorCode],
            data: null
        }

        if(data) {
            responseObject.data = await data;
        }

        if(payload) {
            responseObject.payload = await payload;
        }

        return responseObject;
    }
}