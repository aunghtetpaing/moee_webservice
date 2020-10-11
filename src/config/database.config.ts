import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { isDefault } from '../utilites/config.utilites';
import { 
    db_default_host, 
    db_default_name, 
    db_default_pass, 
    db_default_port, 
    db_default_user, 
    db_host, 
    db_name, 
    db_pass, 
    db_ports, 
    db_user, 
    environment 
} from "./configuration";

export const dbConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: isDefault(db_host) ? db_default_host : db_host[environment],
    port: isDefault(db_ports) ? db_default_port: db_ports[environment],
    username: isDefault(db_user) ? db_default_user : db_user[environment],
    password: isDefault(db_pass) ? db_default_pass : db_pass[environment],
    database: isDefault(db_name) ? db_default_name : db_name[environment],
    autoLoadEntities: true,
    retryAttempts: 10,
    retryDelay: 3000,
    logger: "file",
    logging: "all",
    cache: true,
    synchronize: true
}