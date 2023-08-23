const Joi = require("joi");
const emailRegexp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const joiSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).required(),
});

const registerSchema = joiSchema;

const loginSchema = joiSchema;

module.exports = {
  registerSchema,
  loginSchema,
};
