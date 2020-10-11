import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { BadRequestResponse } from '../interface/response.interface';

@Injectable()
export class GlobalValidationPipe implements PipeTransform<any> {

  responseObject: BadRequestResponse = {
    responseCode: HttpStatus.BAD_REQUEST,
    errorCode: '',
    status: 'Failed',
    description: false
  };

  constructor(){}

  async transform(value: any, { metatype }: ArgumentMetadata) {

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    
    if (errors.length > 0) {

      Object.values(errors[0].constraints).map((keys) => {
        this.responseObject.description = keys;
      });

      this.responseObject.errorCode = 'USR002';
      throw new BadRequestException(this.responseObject);
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
