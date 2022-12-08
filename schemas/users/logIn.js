const Joi = require("joi");

const logIn = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

module.exports = logIn;
