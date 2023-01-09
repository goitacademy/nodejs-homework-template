const Joi = require("joi");

const user = {
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string().default("starter").optional(),
};

const signupUserSchema = Joi.object({
  email: user.email,
  password: user.password,
  subscription: user.subscription,
}).required();

const loginUserSchema = Joi.object({
  email: user.email,
  password: user.password,
}).required();

module.exports = {
  signupUserSchema,
  loginUserSchema,
};
