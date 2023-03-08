import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import { validationFields } from 'helpers/validation';
import { ValidationError } from 'helpers/errors';
import { validationRequest } from './validationRequest';

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

const avatarValidation = (req: Request, _res: Response, next: NextFunction): any => {
  if (req.file?.fieldname !== 'avatar') {
    throw new ValidationError('"avatar" field is required');
  }

  next();
};

export default {
  auth: validationRequest(authSchema, 'body'),
  subscription: validationRequest(subscriptionSchema, 'body'),
  email: validationRequest(emailSchema, 'body'),
  avatar: avatarValidation,
};
