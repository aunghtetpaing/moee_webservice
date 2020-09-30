import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { sortObject } from '../utilites';

@Injectable()
export class GlobalValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    
    if (errors.length > 0) {

        let responseMessage: string;

        Object.values(errors[0].constraints).map((keys) => {
            responseMessage = keys;
        });

        let responseObject = sortObject({
          errorCode: '004',
          description: 'BAD_REQUEST',
          message: responseMessage,
          data: []
        })
        throw new BadRequestException(responseObject);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
