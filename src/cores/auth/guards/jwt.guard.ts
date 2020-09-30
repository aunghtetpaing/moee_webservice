import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { sortObject } from "../../../utilites";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(error: any, payload: any) {
        if(payload === false) {
            throw new UnauthorizedException(sortObject({ 
                errorCode: '006',
                description: 'Invalid Token',
                message: 'UNAUTHORIZED',
                data: []
            }));
        }
        return payload;
    }
}