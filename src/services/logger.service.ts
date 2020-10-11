import { Logger } from '@nestjs/common';

export class AppLogger extends Logger {

    error(message: string, type: string) {
        super.error(`[${type}] - ${message}`);
    }

    log(message: any, type: string) {
        super.log(`[${type}] - ${message}`);
    }

}