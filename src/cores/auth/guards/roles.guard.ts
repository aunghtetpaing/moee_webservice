import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { sortObject } from "../../../utilites";

@Injectable()
export  class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if(!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const user = request.user;
        const hasRoles = roles.indexOf(user.roles) > -1;

        if(hasRoles === true) {
            return hasRoles;
        }

        throw new ForbiddenException(sortObject({ 
            errorCode: '005',
            description: 'Permission Denined',
            message: 'UNAUTHORIZED',
            data: []
        }));
    }
}
