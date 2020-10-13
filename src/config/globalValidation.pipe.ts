import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { BadRequestResponse } from '../interface/response.interface';

import { response, Response } from 'express';

@Injectable()
export class GlobalValidationPipe implements PipeTransform<any> {

  res: Response = response;
  constructor(){ }

  async transform(value: any, { metatype }: ArgumentMetadata) {

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    
    if (errors.length > 0) {

      Object.values(errors[0].constraints).map((keys) => {
      });

      // this.responseObject.errorCode = 'USR002';
      // throw new BadRequestException(this.responseObject);
      this.res.status(HttpStatus.BAD_REQUEST).json({
        data: 'dfdf'
      });
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
