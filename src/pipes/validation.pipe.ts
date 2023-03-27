//npm i class-validator class class-transformer

import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {ValidationException} from "../exceptions/validation.exception";


@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value);
        const err = await validate(obj);

        if (err.length) {
            let message = err.map(err => {
                return `${err.property}`
            })
            throw new ValidationException(message)
        }

        return value;
    }

}