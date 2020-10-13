import { AppEnv } from "src/interface/app.interface";

export const environment = AppEnv.LOCAL;

// Application Configuration Setting
export const defaultPrefix: string = '';
export const defaultAppVersion: string = '';
export const defaultPort: number = null;
export const defaultBaseUrl: string = '';
export const defaultAppKey: string = '';
export const defaultJWTSecret: string = '';

export const prefix: string[] = ['api', 'api', 'api', 'api'];
export const appVersion: string[] = ['1', '1', '1', '1'];
export const ports: number[] = [ 8080, 8080, 8080, 8080 ];
export const baseUrl: string[] = [
    'http://localhost',
    'https://moeeapi.innoscript.co',
    'https://dev.api.moee.com',
    'https://api.moee.com'
];
export const appKeys: string[] = [
    'D3923E005E46A53F',
    '2AD72D8E326B5335',
    '5BB0524275B8CF7A',
    '4DE589570FD13E49'
];
export const jwtSecret: string[] = [
    'D611628FFFCC7BA1DD476B6EA3004B4DEEC4850465A505DC6A6546329D069EB1616C95E437210E7A2A4CFEBEB5DA45631A1E5BBF5DB80A6456E9A0C2CE614094',
    '63CC7EAB0936FF8CAF0A17A2212ECDCB51DFE81832D566FB1D081A34CEBAADFFC79B8D25E2488EEFFC183C0819E4D702159E11CF5E8FE82274A323192290B8C1',
    'D28C4B012B8961B74E81CBB9697CFA0CC2301A74B0F0F28E7E7C329912FAED4442B4182A8D9E683D83E2C8A97CE52F507B7DCD83A5DE84BC69F5191AFCC172F2',
    '7AEF3334C95AD029E8607B26955DEFBBB3A940AF9F2733A974C394370262107570D4F22EB2B633E047447F345D59DF25ED1A8B36055A643407452DD00A176DB2'
];

//Database Configutation Setting
export const db_default_port: number = 3306;
export const db_default_host: string = 'localhost';
export const db_default_user: string = 'root';
export const db_default_pass: string = 'Welcomeinno$10000';
export const db_default_name: string = 'moee';

export const db_type: string[] = [];
export const db_ports: number[] = [];
export const db_host: string[] = [];
export const db_user: string[] = [];
export const db_pass: string[] = [];
export const db_name: string[] = [];