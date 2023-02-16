import joi from 'joi';
import { ESubscription } from 'types/User.type';

export const phonePattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

export const validationFields = {
  contactId: joi.string().pattern(/^[0-9a-fA-F]{24}$/, 'Invalid id.'),
  name: joi.string().min(3).max(30),
  email: joi.string().email(),
  phone: joi.string().pattern(phonePattern),
  password: joi.string().min(3).max(30),
  favorite: joi.boolean(),
  limit: joi.number().integer().min(1).max(20),
  page: joi.number().integer().min(1),
  subscription: joi.string().valid(...Object.values(ESubscription)),
};

export const isEmailValid = (email: string) => !validationFields.email.validate(email).error;
