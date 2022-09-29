const Joi = require("joi");

const signupSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

module.exports = signupSchema;
