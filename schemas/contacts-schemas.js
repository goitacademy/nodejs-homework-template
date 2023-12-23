import Joi from 'joi';

// ============================================================

export const contactAddSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({ 'any.required': 'missing required NAME field' }),
  email: Joi.string()
    .email()
    .required()
    .messages({ 'any.required': 'missing required EMAIL field' }),
  phone: Joi.string()
    .min(5)
    .max(15)
    .pattern(/^[\d+(). -]{5,15}$/)
    .required()
    .messages({
      'string.pattern.base': `PHONE must have only digits.`,
      'any.required': 'missing required PHONE field',
    }),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string()
    .min(5)
    .max(15)
    .pattern(/^[\d+(). -]{5,15}$/)
    .messages({
      'string.pattern.base': `PHONE must have only digits.`,
    }),
});
