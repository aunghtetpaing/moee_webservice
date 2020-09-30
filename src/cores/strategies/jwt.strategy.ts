import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AppConfig } from "src/config/app.config";
import { JwtPayload } from "../../interface/jwt.payload.interface";

@Injectable()
export class JwtStrstegy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            passReqToCallback: false,
            secretOrKey: AppConfig.secret
        });
    }

    async validate(payload: JwtPayload): Promise<JwtPayload> {
        return payload;
    }
}