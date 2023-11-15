import Joi from 'joi';

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `"name" field is required`,
    'string.base': `"name" must be a text`,
  }),
  email: Joi.string().required().messages({
    'any.required': `"email" field is required`,
  }),
  phone: Joi.string().required().messages({
    'any.required': `"phone" field is required`,
  }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().messages({
    'string.base': `"name" must be a text`,
  }),
  email: Joi.string(),
  phone: Joi.string(),
});
