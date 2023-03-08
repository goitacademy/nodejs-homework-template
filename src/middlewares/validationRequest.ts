import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { ValidationError } from 'helpers/errors';

type RequestFieldType = 'body' | 'query' | 'params';

export const validationRequest =
  (schema: Joi.ObjectSchema, type: RequestFieldType = 'body') =>
  (req: Request, _res: Response, next: NextFunction) => {
    const validationResult = schema.validate(req[type]);

    if (validationResult.error) {
      throw new ValidationError(validationResult.error.message);
    }

    next();
  };
