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

export enum SupportPlatform {
    Web, Android, IOS, Desktop, Portal,
}

export interface App {
    env: AppEnv,
    prefix: string;
    baseUrl: string;
    port: number;
    version: string;
    jwtSecret: string;
    appKey: string;
}

export interface AppVerification {
    env: AppEnv,
    version: string;
    platform?: SupportPlatform;
}

