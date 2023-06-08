const Joi = require("joi");

const register = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
});

const login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
});

const email = Joi.object({
  email: Joi.string().required(),
});

module.exports = {
  register,
  login,
  email,
};
