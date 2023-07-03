const Joi = require("joi");

const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    subscription: Joi.string().required(),
  });
  
  const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegexp).required(),
  });
  
  const schemas = {
    registerSchema,
    loginSchema,
  };
  
  module.exports = schemas;