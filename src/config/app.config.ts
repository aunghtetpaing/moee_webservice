import { App, AppEnv } from "src/interface/app.interface";

export const AppConfig: App = {
    prefix: 'api',
    baseUrl: 'https://moeeapi.innoscript.co',
    port: 8080,
    version: 1.0,
    env: AppEnv.PROD,
    secret: 'Welcomeinno$10000'
}