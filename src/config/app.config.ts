import { App, AppEnv } from "src/interface/app.interface";

const environment = AppEnv.LOCAL;

const baseUrl: string[] = [
    'http://localhost',
    'https://moeeapi.innoscript.co',
    'https://dev.api.moee.com',
    'https://api.moee.com'
];

const default_port: number = 8080;
const ports: number[] = [];

const accept_secret_key: string[] = ['welcomeinno$100000'];

export const AppConfig: App = {
    env: environment,
    prefix: 'api',
    baseUrl: baseUrl[environment],
    port: ports.length === 0 ? default_port : ports[environment],
    accept_secret_key: accept_secret_key[environment],
    version: '2',
    secret: 'Welcomeinno$10000'
}