import Joi from 'joi';

const userRegisterSchema = Joi.object({
  email: Joi.string().email().required().max(49).messages({
    'any.required': 'missing required email field!',
    'string.empty': "Email can't be empty!",
    'string.email': 'Invalid email format!',
    'string.base': 'Email must be a string!',
    'string.max': 'Email must not exceed 49 characters!',
  }),
  password: Joi.string().required().min(6).max(49).messages({
    'any.required': 'missing required password field!',
    'string.empty': "Password can't be empty!",
    'string.base': 'Password must be a string!',
    'string.max': 'Password must not exceed 49 characters!',
    'string.min': 'Password must exceed 6 characters!',
  }),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required().max(49).messages({
    'any.required': 'missing required email field!',
    'string.empty': "Email can't be empty!",
    'string.email': 'Invalid email format!',
    'string.base': 'Email must be a string!',
    'string.max': 'Email must not exceed 49 characters!',
  }),
  password: Joi.string().required().min(6).max(49).messages({
    'any.required': 'missing required password field!',
    'string.empty': "Password can't be empty!",
    'string.base': 'Password must be a string!',
    'string.max': 'Password must not exceed 49 characters!',
    'string.min': 'Password must exceed 6 characters!',
  }),
});

export default { userRegisterSchema, userLoginSchema };
