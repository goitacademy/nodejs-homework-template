const Joi = require("joi");

const authLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

module.exports = authLoginSchema;
