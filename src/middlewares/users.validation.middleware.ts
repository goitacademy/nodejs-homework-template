import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import { validationFields } from 'helpers/validation';
import { ValidationError } from 'helpers/errors';

const authSchema = joi.object({
  email: validationFields.email.required(),
  password: validationFields.password.required(),
});

const emailSchema = joi.object({
  email: validationFields.email.required(),
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

export const emailValidation = (req: Request, _res: Response, next: NextFunction): any => {
  const validationResult = emailSchema.validate(req.body);

  if (validationResult.error) {
    throw new ValidationError(validationResult.error.message);
  }

  next();
};

export const avatarValidation = (req: Request, _res: Response, next: NextFunction): any => {
  if (req.file?.fieldname !== 'avatar') {
    throw new ValidationError('"avatar" field is required');
  }

  next();
};
