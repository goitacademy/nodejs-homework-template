import Joi from 'joi';
import emailRegexp from '../constants/user-constants.js';
// ####################################################

const registerSchema = Joi.object({
  name: Joi.string(),
  // name: Joi.string().required(),
  // email: Joi.string().email().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
  avatarUrl: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export default { registerSchema, loginSchema };
