
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