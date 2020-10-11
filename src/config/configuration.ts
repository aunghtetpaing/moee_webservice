import { AppEnv } from "src/interface/app.interface";

export const environment = AppEnv.LOCAL;

// Application Configuration Setting
export const default_prefix: string = 'api';
export const default_app_version: string = '1';
export const default_port: number = 8080;
export const default_baseUrl: string = 'http://localhost';
export const default_accept_secret_key: string = 'welcomeinno$100000';
export const default_secret: string = 'Welcomeinno$10000';

export const prefix: string[] = [];
export const app_version: string[] = [];
export const ports: number[] = [];
export const baseUrl: string[] = [
    'http://localhost',
    'https://moeeapi.innoscript.co',
    'https://dev.api.moee.com',
    'https://api.moee.com'
];
export const accept_secret_key: string[] = [];
export const secret: string[] = [];

//Database Configutation Setting
export const db_default_port: number = 3306;
export const db_default_host: string = 'localhost';
export const db_default_user: string = 'ahp';
export const db_default_pass: string = 'Welcomeinno$10000';
export const db_default_name: string = 'moee';

export const db_type: string[] = [];
export const db_ports: number[] = [];
export const db_host: string[] = [];
export const db_user: string[] = [];
export const db_pass: string[] = [];
export const db_name: string[] = [];