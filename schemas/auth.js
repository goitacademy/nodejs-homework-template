const Joi = require("joi");

const emailRegexp =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.empty": `email is a required`,
    "string.pattern.base": `email invalid`,
  }),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const schemas = { registerSchema, loginSchema };

module.exports = schemas;
