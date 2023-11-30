const Joi = require("joi");
const registerSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});
const emailSchema = Joi.object({
  email: Joi.string().required(),
});
const schema = {
  registerSchema,
  loginSchema,
  emailSchema,
};
module.exports = {
  schema,
};
