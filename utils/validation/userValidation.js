const Joi = require("joi");

const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegExp).required(),
    password: Joi.string().min(8).required(),
  });
  
  const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegExp).required(),
    password: Joi.string().min(8).required(),
  });
  
  const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
  });
  
  const schemas = {
    registerSchema,
    loginSchema,
    updateSubscriptionSchema,
  };

  module.exports = { schemas };