export enum AppEnv {
    LOCAL = 0, 
    DEV = 1, 
    UAT = 2, 
    PROD = 3
}

export enum AppType {
    WEB = 0,
    PORTAL = 1,
    DESKTOP = 2,
    IOS = 3,
    ANDROID = 4,
    TV = 6,
    OTHER = 7,
}

export interface App {
    env: AppEnv,
    prefix: string;
    baseUrl: string;
    port: number;
    version: string;
    secret: string;
    accept_secret_key: string;
}

export interface AppVerification {
    env: AppEnv,
    version: string;
}