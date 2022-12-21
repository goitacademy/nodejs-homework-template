const Joi = require("joi");

const joiReverifyEmailSchema = Joi.object({
  email: Joi.string().required(),
});

module.exports = joiReverifyEmailSchema;
