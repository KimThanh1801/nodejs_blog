import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import type { RequestHandler } from 'express';

export const validationMiddleware = (
  type: any,
  skipMissingProperties = false
): RequestHandler => {
  return (req, res, next) => {
    const dto = plainToInstance(type, req.body);

    validate(dto, { skipMissingProperties }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors
          .map(error => Object.values(error.constraints || {}))
          .join(', ');
        res.status(400).json({ message });
      } else {
        req.body = dto;
        next();
      }
    });
  };
};
