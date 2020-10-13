
import { App } from "src/interface/app.interface";
import { isDefault } from '../utilites/config.utilites';
import { 
    appKeys, 
    appVersion, 
    baseUrl, 
    defaultAppKey, 
    defaultAppVersion, 
    defaultBaseUrl, 
    defaultJWTSecret, 
    defaultPort, 
    defaultPrefix, 
    environment, 
    jwtSecret, 
    ports, 
    prefix, 
} from './configuration';

export const AppConfig: App = {
    env: environment,
    prefix: isDefault(prefix) ? defaultPrefix : prefix[environment],
    version: isDefault(appVersion) ? defaultAppVersion : appVersion[environment],
    baseUrl: isDefault(baseUrl) ? defaultBaseUrl : baseUrl[environment],
    port: isDefault(ports) ? defaultPort : ports[environment],
    appKey: isDefault(appKeys) ? defaultAppKey : appKeys[environment],
    jwtSecret: isDefault(jwtSecret) ? defaultJWTSecret : jwtSecret[environment]
}