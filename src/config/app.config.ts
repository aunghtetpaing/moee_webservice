import { App } from "src/interface/app.interface";
import { isDefault } from '../utilites/config.utilites';
import { 
    accept_secret_key, 
    baseUrl, 
    environment, 
    ports, 
    prefix, 
    app_version, 
    secret, 
    default_port, 
    default_prefix, 
    default_baseUrl,
    default_accept_secret_key,
    default_secret,
    default_app_version
} from './configuration';

export const AppConfig: App = {
    env: environment,
    prefix: isDefault(prefix) ? default_prefix : prefix[environment],
    version: isDefault(app_version) ? default_app_version : app_version[environment],
    baseUrl: isDefault(baseUrl) ? default_baseUrl : baseUrl[environment],
    port: isDefault(ports) ? default_port : ports[environment],
    accept_secret_key: isDefault(accept_secret_key) ? default_accept_secret_key : accept_secret_key[environment],
    secret: isDefault(secret) ? default_secret : secret[environment]
}