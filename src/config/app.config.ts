import { App, AppEnv } from "src/interface/app.interface";

export const AppConfig: App = {
    prefix: 'api',
    baseUrl: 'http://localhost',
    port: 9090,
    version: 1.0,
    env: AppEnv.LOCAL,
    secret: 'Welcomeinno$10000'
}