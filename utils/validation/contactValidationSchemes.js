const Joi = require("joi");

const createContactValidationSchema = Joi.object({
  "name": Joi.string().min(3).max(40).required().messages({
    'any.required': `Missing required name field`,
  }),
  "email": Joi.string().min(3).max(40).required().messages({
    'any.required': 'Missing required email field',
    
  }),
  "phone": Joi.string().min(3).max(40).required().messages({
    'any.required': `Missing required phone field`,
  }),
});

const updateContactValidationSchema = Joi.object({
  name: Joi.string().min(3).max(40),
  email: Joi.string().min(3).max(40),
  phone: Joi.string().min(3).max(40)
}).or("name", "email", "phone");

module.exports = {
  createContactValidationSchema,
  updateContactValidationSchema,
};
