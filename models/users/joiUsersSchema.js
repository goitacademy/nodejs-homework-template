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

module.exports = {
  register,
  login,
};
