import Joi from 'joi';

const contactAddSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required name field' }),
  email: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required email field' }),
  phone: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required phone field' }),
});
const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

export default { contactAddSchema, contactUpdateSchema };
