import { Request, Response, NextFunction } from 'express';
import joi from 'joi';
import { validationFields } from 'helpers/validation';
import { ValidationError } from 'helpers/errors';

const contactIdSchema = joi.object({
  contactId: validationFields.contactId.required(),
});

const addContactSchema = joi.object({
  name: validationFields.name.required(),
  email: validationFields.email.required(),
  phone: validationFields.phone.required(),
  favorite: validationFields.favorite.optional(),
});

const updateContactSchema = joi
  .object()
  .keys({
    name: validationFields.name.optional(),
    email: validationFields.email.optional(),
    phone: validationFields.phone.optional(),
    favorite: validationFields.favorite.optional(),
  })
  .min(1)
  .messages({ 'object.min': 'You need to add at least one field for changing the contact.' });

const updateFavoriteSchema = joi.object({
  favorite: validationFields.favorite.required(),
});

export const getContactByIdValidation = (req: Request, _res: Response, next: NextFunction): any => {
  const validationResult = contactIdSchema.validate(req.params);

  if (validationResult.error) {
    throw new ValidationError(validationResult.error.message);
  }

  next();
};
export const addContactValidation = (req: Request, _res: Response, next: NextFunction): any => {
  const validationResult = addContactSchema.validate(req.body);

  if (validationResult.error) {
    throw new ValidationError(validationResult.error.message);
  }

  next();
};
export const updateContactValidation = (req: Request, _res: Response, next: NextFunction): any => {
  const validationResult = updateContactSchema.validate(req.body);

  if (validationResult.error) {
    throw new ValidationError(validationResult.error.message);
  }

  next();
};
export const updateFavoriteValidation = (req: Request, _res: Response, next: NextFunction): any => {
  const validationResult = updateFavoriteSchema.validate(req.body);

  if (validationResult.error) {
    throw new ValidationError(validationResult.error.message);
  }

  next();
};
