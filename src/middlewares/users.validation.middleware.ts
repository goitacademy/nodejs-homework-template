import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import { validationFields } from 'helpers/validation';
import { ValidationError } from 'helpers/errors';

const authSchema = joi.object({
  email: validationFields.email.required(),
  password: validationFields.password.required(),
});

const subscriptionSchema = joi.object({
  subscription: validationFields.subscription.required(),
});

export const authValidation = (req: Request, _res: Response, next: NextFunction): any => {
  const validationResult = authSchema.validate(req.body);

  if (validationResult.error) {
    throw new ValidationError(validationResult.error.message);
  }

  next();
};

export const subscriptionValidation = (req: Request, _res: Response, next: NextFunction): any => {
  const validationResult = subscriptionSchema.validate(req.body);

  if (validationResult.error) {
    throw new ValidationError(validationResult.error.message);
  }

  next();
};
