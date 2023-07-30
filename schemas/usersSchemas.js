import Joi from 'joi';
import emailRegexp from '../constants/user-constants.js';
// ####################################################

const signupSchema = Joi.object({
  name: Joi.string().required(),
  // email: Joi.string().email().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const signinSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export default { signupSchema, signinSchema };
