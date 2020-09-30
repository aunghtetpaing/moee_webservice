export enum AppEnv {
    LOCAL, DEV, UAT, PROD
}

export interface App {
    prefix: string;
    baseUrl: string;
    port: number;
    version: number;
    env: AppEnv,
    secret: string;
}
