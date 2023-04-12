const Joi = require("joi");

const registrationSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

module.exports = registrationSchema;
