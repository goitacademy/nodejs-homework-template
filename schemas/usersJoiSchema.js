const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const updateSubsSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const usersJoiSchema = {
  registerSchema,
  loginSchema,
  updateSubsSchema,
};

module.exports = usersJoiSchema;
