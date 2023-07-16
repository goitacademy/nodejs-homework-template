import Joi from 'joi';

const contactsAddSchema = Joi.object({
  name: Joi.string().required().max(49).messages({
    'any.required': 'missing required name field!!',
    'string.empty': "Name can't be empty!!",
    'string.base': 'Name must be a string!',
    'string.max': 'Name must not exceed 49 characters!',
  }),
  email: Joi.string().email().required().max(49).messages({
    'any.required': 'missing required email field!',
    'string.empty': "Email can't be empty!",
    'string.email': 'Invalid email format!',
    'string.base': 'Email must be a string!',
    'string.max': 'Email must not exceed 49 characters!',
  }),
  phone: Joi.string()
    .pattern(/^[\d()\s+-]+$/)
    .required()
    .messages({
      'string.pattern.base':
        "Phone number must contain only digits, spaces, and the following characters: '()', '+', and '-'!",
      'any.required': 'missing required phone field!',
      'string.empty': "Phone number can't be empty!",
      'string.base': 'Phone number must be a string!',
    }),
});

export default {
  contactsAddSchema,
};
