const Joi = require("joi");

const userJoiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
});

module.exports = userJoiSchema;
