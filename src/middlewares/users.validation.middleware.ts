import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import { validationFields } from 'helpers/validation';
import { ValidationError } from 'helpers/errors';
// import { responseError } from 'helpers/apiHelpers';

const authSchema = joi.object({
  email: validationFields.email.required(),
  password: validationFields.password.required(),
});

export const authValidation = (req: Request, _res: Response, next: NextFunction): any => {
  const validationResult = authSchema.validate(req.body);

  if (validationResult.error) {
    throw new ValidationError(validationResult.error.message);
    // return res.status(400).json(responseError(new ValidationError(validationResult.error.message)));
  }

  next();
};
