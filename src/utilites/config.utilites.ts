import * as crypto from 'crypto-js';
import { App, AppVerification, SupportPlatform } from 'src/interface/app.interface';
import { AppLogger } from '../services/logger.service';

export const isDefault = (envType: any[]) => {
    let is_default: boolean = false;

    is_default = envType.length === 0 || envType.length < 4 ? true : false;
    return is_default;
}

export const isEnv = (envList: any): boolean[] => {
    const error_array = Object.keys(envList).map((keys) => {

        if(envList[keys] === '') {
            AppLogger.error(`[AppSetup] -  environment variable '${keys}' value is empty`);
            return true;
        } else {
            return false;
        }
    });

    return error_array;

}

export const Generate16BitsKeys = (appVerify: App) => {
    let secret: string = crypto.lib.WordArray.random(128/16).toString(crypto.enc.Hex);
    let jwtSecret: string = crypto.lib.WordArray.random(512/8).toString(crypto.enc.Hex);
    let appKeyData: AppVerification = {
        env: appVerify.env,
        version: appVerify.version,
        platform: SupportPlatform.Web
    }

    secret = secret.toUpperCase();
    jwtSecret = jwtSecret.toUpperCase();

    let appKey = crypto.AES.encrypt(JSON.stringify(appKeyData),secret).toString();

    return {
        jwtSecret: jwtSecret,
        secret: secret,
        appKey: appKey
    };
}