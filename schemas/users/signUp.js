const Joi = require("joi");

const signUp = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

module.exports = signUp;
